# WARNING: WORK IN PROGRESS! NOTHING HERE ACTUALLY WORKS YET!
# SyndiCat [![Build Status](https://travis-ci.org/jchristi/syndicat.svg?branch=master)](https://travis-ci.org/jchristi/syndicat)
A fast RSS parser and reader based on Tiny-Tiny-RSS

## Installation
Currently no working installation.

## Feature Ideas
A few features that *may* be implemented in the future:

* full article fetching
* find hidden feeds (by guessing common feed URL patterns)
* embedded [spritzing](http://spritzinc.com/) for fast, easy article reading.
  Doesn't work well for articles with tables or images (See also: [Glance](https://github.com/Miserlou/Glance),
  [Squirt](https://github.com/cameron/squirt))
* Pluggable feed entry exporters (ie. "send to" / "share")
* Feed aggregator+filter: http://dai-shi.github.io/rss-pipes/
* Article content compression in database BLOB field (Snappy, EXI, or Fast Infoset)
  * Snappy - [node-snappy](https://github.com/kesla/node-snappy)
  * EXI - [exificient.js](https://github.com/EXIficient/exificient.js)
* Feed suggestions [Wordpress](https://codex.wordpress.org/WordPress_Feeds#Finding_Your_Feed_URL)
* Aggregate similar or duplicate / linked articles
* Smart ranking and filtering

## Contributing
Contributions welcome. Please include mocha tests with all PRs.

## Misc
### Strict Mode
Why you should use strict mode everywhere: https://stackoverflow.com/a/23765454

## Useful Resources
- [Node Feature Support Chart](http://node.green/)
