'use strict';

const feed_funcs = require('./functions/feed');
const _ = require('lodash');

async function blagah() {
  let urls;
  try {
    urls = await feed_funcs.find_feed_urls(process.argv[process.argv.length - 1]);
  } catch(e) {
    console.log('first shit went wrong', e);
    return;
  }
  _.each(urls, (url) => { console.log(url); });
  if (urls.length == 0) {
    console.log('Error: no feeds were found!');
    return;
  }
  let feed_url = urls[0];
  let items = null;
  try {
    items = await feed_funcs.get_feed_articles(feed_url);
  } catch(e) {
    console.log('some shit went wrong', e);
  }
  _.each(items, item => {
    console.log(item.title);
  });
}

blagah();
