'use strict';

var test = require('ava').test;
require('../hooks').all(test);


test.beforeEach('beforeEach: create User fixtures', function* (t) {
  let _result = yield t.context.db.loadModels(['User', 'Feed', 'FeedCategory']);
  let user1 = yield t.context.db.User.create({
    id: 1,
    login: 'admin',
    full_name: 'Admin admin',
    pwd_hash: '************',
    salt: '***********'
  });
});

test('User model has Feeds property', function* (t) {
  let db = t.context.db;
  let user = yield db.User.findOne();
  t.context.assert.hasAssocModel(user, 'Feeds');
  user = yield db.User.findOne({
    id: 1,
    include: [{
      model: db.Feed,
      attributes: [ 'id' ],
    }]
  });
  // let type = typeof user.Feeds;
  t.true(user.Feeds instanceof Array);
});

test.skip('User can be created', function* (t) {
  let login = 'Gerbologist';
  let user1 = yield t.context.db.User.create({
    id: 2,
    login: login,
    full_name: 'Gee Beer',
    pwd_hash: '*********',
    salt: '**********'
  });
  let user2 = yield t.context.db.User.findById(2);
  t.is(user1.login, user2.login);
});
