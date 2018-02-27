# WARNING: WORK IN PROGRESS! NOTHING HERE ACTUALLY WORKS YET!
# SyndiCat [![Build Status](https://travis-ci.org/jchristi/syndicat.svg?branch=master)](https://travis-ci.org/jchristi/syndicat)
A fast RSS parser and reader based on Tiny-Tiny-RSS

## Installation
Currently no working installation.

## Feature Ideas
A few features that *may* be implemented in the future:

* full article fetching
* find hidden feeds (by guessing common feed URL patterns) - DONE
* embedded [spritzing](http://spritzinc.com/) for fast, easy article reading.
  Doesn't work well for articles with tables or images (See also: [Glance](https://github.com/Miserlou/Glance),
  [Squirt](https://github.com/cameron/squirt))
* Pluggable feed entry exporters (ie. "send to" / "share")
* Feed aggregator+filter: http://dai-shi.github.io/rss-pipes/
* Article content compression in database BLOB field (Snappy, EXI, or Fast Infoset)
  * Snappy - [node-snappy](https://github.com/kesla/node-snappy)
  * EXI - [exificient.js](https://github.com/EXIficient/exificient.js)
* Aggregate similar or duplicate / linked articles
* Smart ranking and filtering
* Scrapper plugins to convert HTML pages to feeds ([YouTube](https://github.com/porjo/freshtube/blob/master/js/script.js), [Twitter](https://www.ibm.com/developerworks/library/wa-convert-your-twitter-lists-to-rss/index.html), [Google+](https://www.labnol.org/internet/google-plus-rss-feeds/25557/), GitHub, Twitch.tv)
* Masquerade user-agent string [1](https://techblog.willshouse.com/2012/01/03/most-common-user-agents/), [2](https://udger.com/resources/ua-list)

## Contributing
Contributions welcome. Please include mocha tests with all PRs.

## Misc
### Strict Mode
Why you should use strict mode everywhere: https://stackoverflow.com/a/23765454

## Useful Resources
- [Node Feature Support Chart](http://node.green/)
