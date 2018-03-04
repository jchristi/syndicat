See [Awesome NodeJS](https://github.com/sindresorhus/awesome-nodejs)

== Potential Names
  * Paperboy
  * Syndicate / Syndikit / SyndiCat
  * Kudzu

== Learning
  * https://github.com/sindresorhus/awesome-nodejs#resources

== Useful Libraries
  * moment.js - parse, validate, display dates (http://momentjs.com/)
  * Gulp (Grunt replacement) - http://www.100percentjs.com/just-like-grunt-gulp-browserify-now/
  * Scraper - https://github.com/Narzerus/yakuza
  * JQuery for Node - https://github.com/cheeriojs/cheerio
  * phpjs is now locutus: http://locutus.io/2016/05/announcing-locutus/

=== HTTP Requests
  * request (currently using)
  * req-fast (https://github.com/Tjatse/req-fast) - faster, might be worth checking out

=== Promises
  * co
  * bluebird - https://github.com/petkaantonov/bluebird
  * Q

=== Testing
  * js testing - https://payhip.com/b/FZWL (http://jstesting.jcoglan.com/contents.pdf)
  * istanbul - https://github.com/gotwarlost/istanbul - code coverage
    * or 'nyc' for support with AVA
  * proxyquire - https://github.com/thlorenz/proxyquire - override require statements
  * rewire - https://github.com/jhnns/rewire/ - Easy monkey-patching for node.js unit tests

=== Debugging
  * node built-in debug (node debug)
  * node-inspector (in-browser debugger)
  * browser-based debugger....

=== Linting
  * JSLint - not configurable
  * JSHint - configurable
  * JSCS
  * ESLint - winner
  * Comparison: http://www.sitepoint.com/comparison-javascript-linting-tools/

=== Configuration
  * https://github.com/bebraw/parse-env
  * https://github.com/flatiron/nconf
  * https://github.com/lorenwest/node-config
  * https://github.com/bebraw/node-configuration-patterns

=== JSON REST API
  * http://tt-rss.org/redmine/projects/tt-rss/wiki/JsonApiReference
  * Probably write it by hand for now
  * Express/MongoDB

=== Router for controllers
  * Express
    * Connect
  * Koa
    * koa-router - does it support regexes?
    * koa-server-push https://github.com/silenceisgolden/koa-server-push

=== ORM
  * Bookshelf
  * Sequelize (using this for now)
  * rdb (https://github.com/alfateam/rdb)

=== Web Sockets
  * Comparison: http://bit.ly/1AuYnh6
  * Options: https://github.com/sindresorhus/awesome-nodejs#real-time
  * Socket.IO
  * RSS Push: https://en.wikipedia.org/wiki/RSS_Cloud

=== Deasync
  * https://github.com/ybogdanov/node-sync#
  * https://github.com/abbr/deasync
  * https://stackoverflow.com/questions/23768043/sync-function-on-nodejs-to-mysql

=== Security
  * snyk - https://github.com/Snyk/snyk - CLI and build-time tool to find & fix known
    vulnerabilities in open-source dependencies

Structuring node.js apps: http://bit.ly/1AgIBTs
  Modules: https://github.com/umdjs/umd
Checking any type in js: http://bit.ly/1FOtDYo
Other userful info: http://kb.imakewebsites.ca/2014/01/04/new-node-wishlist/
Streams: https://johnresig.com/blog/node-js-stream-playground/
         https://github.com/substack/stream-handbook

=== Table names
cat_counters_cache    => cache_category_counter
counters_cache        => cache_counters
error_log             // is it ever a good idea to store errors in the database??
                        // yes, for feed update errors (if it is used for that)
feedbrowser_cache     => cache_feedbrowser
filters2              Model: Filter2 // TODO: difference b/w Filter2 and Filter?
                        // in update.php: --convert-filters    - convert type1 filters to type2
filter_actions        Model: FilterAction (filter, catchup, mark, tag, publish, score, label, stop)
filter_types            // Model: FilterType (title, content, both, link, date, author, tag)
linked_feeds          probably not support for now...
linked_instances      probably not support for now...
plugin_storage        // TODO: overhaul plugin architecture?
sessions              Sessions // TODO: how to manage sessions?
user_entries            Model: UserEntry (M2M table and more)
user_labels2            Model: UserLabel (M2M table)
user_prefs              Model: UserPreference (not M2M table)
