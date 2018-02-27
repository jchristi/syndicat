'use strict';

const Koa     = require('koa');
const Router  = require('koa-router');

const app     = new Koa();
const router  = new Router();
const port    = 5050; // TODO: use config or ENV var

app.listen(port); // TODO: set to HTTPS-only (use nginx for redirecting HTTP traffic)

// TODO: get db connection
app.context.db = null;

// TODO: logging. Configurable as custom log file or systemd
// app.on('error', err => {
//   log.error('server error', err)
// });

const JSON = require('json-strictify');

// https://git.tt-rss.org/fox/tt-rss/wiki/ApiReference
// Only POST methods allowed
// TODO: config option for default endpoint api? (default: ttrss)
router.post('/api', (ctx, next) => {
  // ctx.router available
  ctx.response.body = 'Hello World!';
});

router.post('/api/getApiLevel', (ctx, next) => {
  let res = { level: 13 };
  //ctx.response.body = '{"level":11}';
  ctx.response.body = JSON.stringify(res);
});

router.post('/api/getVersion', (ctx, next) => {
  let res = { version: '1.5.0' };
  ctx.response.body = JSON.stringify(res);
});

router.post('/api/login', (ctx, next) => {
  let res = { session_id: 'xxx' };
  ctx.response.body = JSON.stringify(res);
});

router.post('/api/logout', (ctx, next) => {
  let status = { status: 'OK' };
  if (false) {
    status = { error: 'NOT_LOGGED_IN' };
  }
  ctx.response.body = JSON.stringify(status);
});

router.post('/api/getUnread', (ctx, next) => {
  // let result = ctx.db.get(/*unread feeds*/);
  let unread = 992;
  let res = { unread: unread };
  ctx.response.body = JSON.stringify(res);
});

router.post('/api/getCounters', (ctx, next) => {
  ctx.response.body = '';
});

router.post('/api/getFeeds', (ctx, next) => {
  ctx.response.body = '';
});

router.post('/api/getCategories', (ctx, next) => {
  ctx.response.body = '';
});

router.post('/api/getHeadlines', (ctx, next) => {
  ctx.response.body = '';
});

router.post('/api/updateArticle', (ctx, next) => {
  ctx.response.body = '';
});

router.post('/api/getArticle', (ctx, next) => {
  ctx.response.body = '';
});

router.post('/api/getConfig', (ctx, next) => {
  ctx.response.body = '';
});

router.post('/api/updateFeed', (ctx, next) => {
  ctx.response.body = '';
});

router.post('/api/getPref', (ctx, next) => {
  ctx.response.body = '';
});

router.post('/api/catchupFeed', (ctx, next) => {
  ctx.response.body = '';
});

router.post('/api/getCounters', (ctx, next) => {
  ctx.response.body = '';
});

router.post('/api/getLabels', (ctx, next) => {
  ctx.response.body = '';
});

router.post('/api/setArticleLabel', (ctx, next) => {
  ctx.response.body = '';
});

router.post('/api/shareToPulished', (ctx, next) => {
  ctx.response.body = '';
});

router.post('/api/subscribeToFeed', (ctx, next) => {
  ctx.response.body = '';
});

router.post('/api/unsubscribeFeed', (ctx, next) => {
  ctx.response.body = '';
});

router.post('/api/getFeedTree', (ctx, next) => {
  ctx.response.body = '';
});

app.use(router.routes());
app.use(router.allowedMethods());
