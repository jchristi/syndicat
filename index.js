'use strict';

const JSON      = require('json-strictify');
const Koa       = require('koa');
const Router    = require('koa-router');
const Sequelize = require('sequelize');
const parse     = require('co-body');

const app     = new Koa();
const port    = 5050; // TODO: use config or ENV var

app.listen(port); // TODO: set to HTTPS-only (use nginx for redirecting HTTP traffic)


//
// Get database connection
//
app.context.db = new Sequelize('syndicat', 'username', 'password', {
  host: 'localhost',
  dialect: 'sqlite',
  storage: 'syndicat.db',
  define: {
    timestamps: false,
    underscored: true
  },
  operatorsAliases: false
});
app.context.models = require('./models')(app.context.db);


// TODO: logging. Configurable as custom log file or systemd
// app.on('error', err => {
//   log.error('server error', err)
// });

// helper function for converting a sequelize queryset to a json string
function querysetToJSON(qs) {
  let json = [];
  // TODO: return a stream that can be piped to the response body
  for (let i of qs) {
    json.push(JSON.stringify(i.toJSON()));
  }
  return `[${json.join(',')}]`;
}

/**
 * Tiny-Tiny-RSS backend.php emulation
 * @see: https://git.tt-rss.org/fox/tt-rss/src/master/backend.php
 */
const backend_router = new Router();
backend_router.post('/backend.php', async (ctx, next) => {
  let data = await parse.json(ctx); // TODO: error checking
  let op      = data.op; // TODO: error checking
  let method;
  if ('subop' in data) {
    method = data.subop;
  } else if ('method' in data) {
    method = data.method;
  } else {
    method = 'index';
  }

  let public_calls = [
    'globalUpdateFeeds',
    'rss',
    'getUnread',
    'getProfiles',
    'share',
    'fbexport',
    'logout',
    'pubsub'
  ];
  if (method in public_calls) {
    ctx.redirect(`public.php?${qs}`);
    ctx.status = 301;
    ctx.response.body = '';
    return;
  }

  let csrf_token = data.csrf_token;
  // TODO: check session

  const purge_intervals = {
    -1: 'Never Purge',
    0:  'Use default',
    5:  '1 week old',
    14: '2 weeks old',
    31: '1 month old',
    60: '2 months old',
    90: '3 months old',
  };
  const update_intervals = {
    -1:    'Disable updates',
    0:     'Default interval',
    15:    '15 minutes',
    30:    '30 minutes',
    60:    'Hourly',
    240:   '4 hours',
    720:   '12 hours',
    1440:  'Daily',
    10080: 'Weekly',
  };
  const update_intervals_no_default = {
    -1:    'Disable updates',
    15:    '15 minutes',
    30:    '30 minutes',
    60:    'Hourly',
    240:   '4 hours',
    720:   '12 hours',
    1440:  'Daily',
    10080: 'Weekly',
  };
  const access_level_names = {
    0: 'User',
    5: 'Power User',
    10: 'Administrator',
  };
  try {
    // TODO: don't use 'new' ???
    const handler = new require(`./handlers/${op.replace('/-/g', '_')}`);
    handler[method]();
  } catch (e) {
    throw Error('method does not exist');
    // TODO: return error json
  }

  ctx.request.data = data;
});
app.use(backend_router.routes());
app.use(backend_router.allowedMethods());


/**
 * Tiny-Tiny-RSS API
 * @see: https://git.tt-rss.org/fox/tt-rss/wiki/ApiReference
 */

// TODO: config option for default endpoint api? (default: ttrss)
const router  = new Router({ prefix: '/api' });

router.post('/', async (ctx, next) => {
  ctx.request.data = await parse.json(ctx); // TODO: error checking
  let op = ctx.request.data.op; // TODO: error checking
  await next();
  ctx.redirect(`${ctx.request.url}/${op}`);
  ctx.status = 301;
  ctx.response.body = '';
});

router.post('/login', async (ctx, next) => {
  let res = { session_id: 'xxx' };
  await next();
  ctx.response.body = JSON.stringify(res);
});

router.post('/isLoggedIn', async (ctx, next) => {
  let res = { status: true };
  await next();
  ctx.response.body = JSON.stringify(res);
});

// TODO: Add middleware to check for "sid"

router.post('/getApiLevel', async (ctx, next) => {
  let res = { level: 11 };
  await next();
  ctx.response.body = JSON.stringify(res);
});

router.post('/getVersion', async (ctx, next) => {
  let res = { version: '1.5.0' };
  await next();
  ctx.response.body = JSON.stringify(res);
});

router.post('/logout', async (ctx, next) => {
  let status = { status: 'OK' };
  // if (false) {
  //   status = { error: 'NOT_LOGGED_IN' };
  // }
  await next();
  ctx.response.body = JSON.stringify(status);
});

router.post('/getUnread', async (ctx, next) => {
  // let result = ctx.db.get(/*unread feeds*/);
  let unread = 992;
  let res = { unread: unread };
  await next();
  ctx.response.body = JSON.stringify(res);
});

router.post('/getCounters', async (ctx, next) => {
  await next();
  ctx.response.body = '';
});

/**
 * getFeeds
 *
 * Parameters:
 *  cat_id (integer) - return feeds under category cat_id
 *  unread_only (bool) - only return feeds which have unread articles
 *  limit (integer) - limit amount of feeds returned to this value
 *  offset (integer) - skip this amount of feeds first
 *  include_nested (bool) - include child categories (as Feed objects with is_cat set)
 *                          requires version:1.6.0
 */
router.post('/getFeeds', async (ctx, next) => {
  await next();
  ctx.request.data = await parse.json(ctx); // TODO: error checking
  let opts = {};
  let feeds = ctx.models.Feed.findAll(opts);
  ctx.response.set('Content-Type', 'application/json; charset=utf-8');
  ctx.response.body = querysetToJSON(feeds);
});

/**
 * getCategories
 *
 * Parameters:
 * unread_only (bool) - only return categories which have unread articles
 * enable_nested (bool) - switch to nested mode, only returns topmost categories
 *                        requires version:1.6.0
 * include_empty (bool) - include empty categories requires version:1.7.6
 */
router.post('/getCategories', async (ctx, next) => {
  await next();
  ctx.request.data = await parse.json(ctx); // TODO: error checking
  let opts = {};
  let items = await ctx.models.FeedCategory.findAll(opts);
  ctx.response.set('Content-Type', 'application/json; charset=utf-8');
  ctx.response.body = querysetToJSON(items);
});

router.post('/getHeadlines', async (ctx, next) => {
  await next();
  ctx.response.body = '';
});

router.post('/updateArticle', async (ctx, next) => {
  await next();
  ctx.response.body = '';
});

router.post('/getArticle', async(ctx, next) => {
  await next();
  ctx.response.body = '';
});

router.post('/getConfig', (ctx, next) => {
  ctx.response.body = '';
});

router.post('/updateFeed', (ctx, next) => {
  ctx.response.body = '';
});

router.post('/getPref', (ctx, next) => {
  ctx.response.body = '';
});

router.post('/catchupFeed', (ctx, next) => {
  ctx.response.body = '';
});

router.post('/getCounters', (ctx, next) => {
  ctx.response.body = '';
});

/**
 * GetLabels
 */
router.post('/getLabels', async (ctx, next) => {
  await next();
  let opts = {};
  let labels = await ctx.models.UserLabel.findAll(opts);
  ctx.response.body = querysetToJSON(labels);
});

router.post('/setArticleLabel', (ctx, next) => {
  ctx.response.body = '';
});

router.post('/shareToPulished', (ctx, next) => {
  ctx.response.body = '';
});

router.post('/subscribeToFeed', (ctx, next) => {
  ctx.response.body = '';
});

router.post('/unsubscribeFeed', (ctx, next) => {
  ctx.response.body = '';
});

router.post('/getFeedTree', (ctx, next) => {
  ctx.response.body = '';
});

app.use(router.routes());
app.use(router.allowedMethods());
