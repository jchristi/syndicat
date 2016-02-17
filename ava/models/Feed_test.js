'use strict';

var test = require('ava').test;
var _hooks = require('../hooks').all(test);
var co = require('co');


test.beforeEach('beforeEach: create Feed fixtures', co.wrap(function* (t) {
  let _result = yield t.context.db.loadModels([ 'User', 'Feed' ]);
  let user1 = yield t.context.db.User.create({
    id: 2,
    title: 'Test user',
    login: 'admin',
    full_name: 'Admin admin',
    pwd_hash: '*********',
    salt: '*************',
  });
  console.log(user1.toJSON());
  // let category1 = yield t.context.db.FeedCategory.create({
  //   id: 2,
  //   title: 'Comedy',
  //   owner_uid: 2
  // }, { include: [ t.context.db.User ]});
  let feed1 = yield t.context.db.Feed.create({
    id: 2,
    title: 'Test feed 1',
    feed_url: 'http://xkcd.com/rss.xml', // 'http://www.winehq.org/news/rss/',
    owner_uid: 2,
    // User: {
    //   id: 2,
    //   login: 'admin',
    //   full_name: 'Admin admin',
    //   pwd_hash: '************',
    //   salt: '***********'
    // },
    // cat_id: 2,
    // FeedCategory: {
    //   title: 'Category 1',
    //   owner_uid: 2,
    // }
  }/*, {
    include: [
      t.context.db.User//,
      // t.context.db.FeedCategory
    ],
  }*/);
  console.log(feed1.toJSON());
  t.context.feed1 = feed1;
  t.context.user1 = user1;
}));

test('Feed model has User property', function* (t) {
  let feed = yield t.context.db.Feed.findOne({ include: [ t.context.db.User ]});
  // t.context.assert.hasAssocModel(t, feed, 'User');
  // t.true(feed.hasOwnProperty('User'));
  t.ok(feed.User);
});

test.skip('Feed model has FeedCategory property', function* (t) {
  t.context.assert.hasAssocModel(t.context.feed1, 'FeedCategory');
});

test.skip('Feed can be created', function* (t) {
  let login = 'Gerbologist';
  let user1 = yield t.context.db.User.create({
    id: 2,
    login: login,
    pwd_hash: '*********',
  });
  let user2 = yield t.context.db.User.findById(2);
  t.is(user1.login, user2.login);
});
