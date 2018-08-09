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
  * [MariaDB page compression](https://mariadb.com/kb/en/library/compression/)
* Aggregate similar or duplicate / linked articles
  * use LDA algorithm for similarity
* Smart ranking and filtering
  * Popularity score via Twitter, Alexa, etc.
* Non-RSS sources, scrapper plugins to convert HTML pages to feeds
  * [YouTube](https://github.com/porjo/freshtube/blob/master/js/script.js)
  * [Twitter](https://www.ibm.com/developerworks/library/wa-convert-your-twitter-lists-to-rss/index.html)
  * [Google+](https://www.labnol.org/internet/google-plus-rss-feeds/25557/)
  * Google Groups
  * GitHub
  * Twitch.tv
  * Mailing Lists
  * Hacker News
* Masquerade user-agent string [1](https://techblog.willshouse.com/2012/01/03/most-common-user-agents/), [2](https://udger.com/resources/ua-list)
* Use of AWS services (or IBM or Azure or other clouds):
  * AWS Lambda + Serverless Aurora or DynamoDB + Fargate for very cheap hosting
  * Amazon Comprehend - analysis of articles for sentiment, keywords, topics, etc
  * Amazon Polly - text to speech
  * Amazon Transcribe - speech to text (podcasts, youtube videos, etc)
  * Amazon Neptune - graph database (see alos wikidata.org)
* Discover similar sites/feeds
  * Alexa.com [find similar sites](https://www.alexa.com/find-similar-sites)
    * alexa.com/siteinfo/whatever.com
  * [TopSimilarSites.com](http://www.topsimilarsites.com) - pretty good (might use alexa)
  * [moreofit.com](http://www.moreofit.com) - very good
  * [SimilarSites.com](https://www.similarsites.com)
  * [SimilarSiteSearch](https://www.similarsitesearch.com) - doesnt work as of Mar 2018
  * [SimilarPages.com](http://www.similarpages.com) - not very good
  * Google.com search "related:whatever.com"
  * Google.com search "link:whatever.com -site:whatever.com" (sites that link to whatever.com)
  * Crawl full text of all posts and look for commonly linked sites
* Automatically determine your favorite feeds and score them higher
* Allow comments to be added to feeds and articles
* See Flipboard for ideas. Also [engineering.flipboard.com](http://engineering.flipboard.com)
* [Similar/Related articles](http://engineering.flipboard.com/2017/02/storyclustering)
  * Mark related/similar articles as read
* Dead feed finder/notifier719288
* Fetch entire history of a website
* Historical stats on a feed (like Trends) including how often it is read by you
* Slider to show from "Only most important articles" to "All and more" for a category or view
* Automatic detection of blog categories and provide UI for selecting which categories to subscribe to


## Contributing
Contributions welcome. Please include mocha tests with all PRs.

## Misc
### Strict Mode
Why you should use strict mode everywhere: https://stackoverflow.com/a/23765454

## Useful Resources
- [Node Feature Support Chart](http://node.green/)
