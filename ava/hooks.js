'use strict';

var ava = require('ava');
var co = require('co');
var Sequelize = require('sequelize');
var crypto = Sequelize.Promise.promisifyAll(require('crypto'));

var test = ava.test;
var test_models = require('./models');


//
// runs before any test is run
//
var before = co.wrap(function* (t) {
  // XXX: How is this ever useful in a non-synchronous environment?
});
exports.before = before;


//
// create database and transaction for each test
//
var beforeEach = co.wrap(function* (t) {
  let hash = yield crypto.randomBytesAsync(15);
  hash = hash.toString('base64').substr(0, 14);
  let db = yield test_models.getDB('test-' + hash);
  t.context.db = db;
  t.context.assert = new test_models.Assertions(t);
});
exports.beforeEach = beforeEach;


//
// rollback transaction for each test
//
var afterEach = co.wrap(function* (t) {
  // t.context.db.tx.rollback();
});
exports.afterEach = afterEach;


//
// runs at end of test suite run
//
var after = co.wrap(function* (t) {
  // XXX: How is this ever useful in a non-synchronous environment?
});
exports.after = after;


//
// function to import all hooks
//
exports.all = function(test) {
  // test.before(before);
  test.beforeEach('beforeEach: global hook', beforeEach);
  test.afterEach('afterEach: global hook', afterEach);
  // test.after(after);
};
