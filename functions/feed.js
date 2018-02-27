'use strict';

const _          = require('lodash');
const cheerio    = require('cheerio');
const request    = require('request');
const rp         = require('request-promise');
const feedparser = require('feedparser');
const fp         = require('feedparser-promised');
const normalize_url = require('normalize-url');

console.debug = function(args) {
  if (process.env.DEBUG == 'true'){
    console.log(args);
  }
};

/**
 * find_feed_url
 * Takes a URL and tries to find the associated feeds
 * @param String url - a URL to use as a search for feed URLs
 * @return Array feed_urls - a list of feed URLs
 */
async function find_feed_urls(url) {
  // TODO: make url an opts object
  // ops = { uri: url, html: html, cheerio: $ }
  let html = null;

  try {
    url = normalize_url(url);
  } catch(e) {
    if (e.message !== 'Invalid URL') throw e;
    // Treat url as if it were an html string
    html = url;
  }

  // TODO: Clean this up (separate into more functions)
  if (html === null) {
    // TODO: use a proper logger class/library
    console.debug('Fetching html from ' + url);

    // TODO: if a plugin for the site detected, use that instead of this
    // (youtube, twitter, google+, etc)
    // TODO: use EventEmitter to emit a signal for 'find feed url'

    try {
      let response = await http_request(url);
      //console.log(response);
      html = response.body;
    } catch(e) {
      // TODO: difference between `throw Exception()` and `throw new Error()` ???
      // see: https://www.joyent.com/node-js/production/design/errors
      throw Error('Error looking at original URL');
    }
  }

  const $ = cheerio.load(html);
  const nodes = $('link[type="application/rss+xml"], link[type="application/atom+xml"]')
    .toArray();
  if (nodes.length > 0) {
    try {
      const feed_urls = _.uniq(nodes.map(x => x.attribs.href.trim()));
      // take their word for it and consider these valid without verifying
      console.debug('This site is a good boy');
      return feed_urls;
    } catch (e) {
      // malformed feed links maybe
    }
  }

  // TODO: should probably store these either in the database or config file
  const unreliable_selectors = [
    'link[type*="rss"]',
    'link[type*="atom"]',
    '[href*="rss"]',
    '[href*="atom"]',
    '[href*="feed"]',
    '[href*="rdf"]',
    '[href*="posts"]',
    '[href*="entries"]',
    '[href*="index.xml"]',
  ].join(', ');
  const nodes2 = $(unreliable_selectors).toArray();
  const feed_candidate_urls = _.uniq(nodes2.map(x => x.attribs.href.trim()));
  let feed_urls2 = [];
  for (const candidate_url of feed_candidate_urls) {
    console.debug(`candidate_url: ${candidate_url}`);
    if (await url_is_feed(candidate_url)) {
      feed_urls2.push(candidate_url);
    }
  }
  if (feed_urls2.length > 0) {
    console.debug('This site lists a feed but not properly');
    return feed_urls2;
  }

  // This is a list of potential feed urls. It is sorted by most common occurrences
  // Feed URL suggestions: https://codex.wordpress.org/WordPress_Feeds#Finding_Your_Feed_URL
  // TODO: should probably store these either in the database or config file
  const feed_url_guesses = [
    '/feed',
    '/feeds/posts/default',
    '/rss',
    '/atom.xml',
    '/blog/feed',
    '/?feed=rss2',
    '/rss.xml',
    '/feed/atom',
    '/node/feed',
    '/blog/atom.xml',
    '/rss20.xml',
    '/feeds/posts/default?alt=rss',
    '/blog/atom',
    '/atom',
    '/rdf',
    '/rss.rdf',
    '/rss.php',
    '/atom.php',
    '/index.rdf',
    '/index.rss',
    '/index.atom',
    '/index.xml',
    '/rss/feed',
    '/atom/feed',
    '/feed/rss',
    '/blog/?feed=rss2',
    '/feeds/latest',
    '/entries.atom',
    '/entries.rss',
    '/entries.xml',
    '/?format=feed&type=rss',
    '/?format=feed&type=atom',
    '/?format=feed&type=xml',
    '/posts.xml',
    '/posts.rss',
    '/posts.atom',
    '/feed/podcast',
  ];
  // TODO: start at current url and work back to base_url
  const base_url = get_base_url(url);
  console.debug(`base_url: ${base_url}`);
  for (const endpoint of feed_url_guesses) {
    let url_guess = base_url + endpoint;
    console.debug(`url_guess: ${url_guess}`);
    if (await url_is_feed(url_guess)) {
      console.debug('Bad boy site has an unlisted feed we were able to guess');
      return [url_guess]; // don't guess anymore URLs. Always returning an Array.
    }
  }

  // TODO: check https?://feeds.<domain>/ ??

  // TODO: search feedburner (feeds.feedburner.com/TITLE?format=xml)

  // TODO: if no feeds found, attempt to auto-generate a parser for the html page

  console.debug('Site does not have a feed');

  return []; // we didn't find anything :'(
}

/**
 * Simple helper function to fetch a URL
 */
async function http_request(url, opts) {
  const default_opts = {
    method: 'GET',
    uri: url.trim(),
    gzip: true,
    // see https://github.com/request/request-promise#get-a-rejection-only-if-the-request-failed-for-technical-reasons
    resolveWithFullResponse: true,
    simple: false,
  };
  opts = opts || {};
  opts = Object.assign(default_opts, opts);
  return await rp(opts);
}


/**
 * Checks if the given URL is a valid feed
 */
async function url_is_feed(url) {
  try {
    let response = await http_request(url);
    if (response.statusCode != 200) {
      console.debug(`${url} returned a response code of ${response.responseCode}`);
      return false;
    }
  } catch (e) {
    // bad response, consider that invalid
    console.debug('bad response');
    return false;
  }
  // check if body content is a valid feed
  try {
    let feed = await _create_feed(url/*response.body*/);
    // console.debug('feed');
    // console.debug(feed);
  } catch (e) {
    // not be a valid feed
    console.debug(`${url} is not a valid feed`);
    return false;
  }
  // its parseable, so yeah, return true :)
  console.debug(`${url} is considered a valid feed`);
  return true;
}


/**
 * Simple helper method for parsing a feed
 */
async function _create_feed(url/*str*/) {
  // let feed = new FeedParser();
  let feed = await fp.parse({
    uri: url,
    method: 'GET',
    gzip: true,
  } /*str*/, { // TODO: make this accept an html string instead of re-doing the request
    // TODO: const to_stream = require('into-stream'); to_stream(str).pipe(process.stdout);
    normalize: true,
    addmeta: true,
    resume_saxerror: true,
  });
  return feed;
}


/**
 * Get the base url
 */
function get_base_url(url) {
  const pathArray = url.trim().split( '/' );
  const protocol = pathArray[0];
  const host = pathArray[2];
  const base_url = protocol + '//' + host;
  return base_url;
}


/**
 * Get feed articles
 */
async function get_feed_articles(feed_url) {
  // TODO: validate feed_url

  // TODO: plugins

  //debugger;
  return _create_feed(feed_url);
}

exports.url_is_feed = url_is_feed;
exports.http_request = http_request;
exports.find_feed_urls = find_feed_urls;
exports.get_base_url = get_base_url;
exports.get_feed_articles = get_feed_articles;
