"use strict"

var l               = require('lodash');
var co              = require('co');
var path            = require('path');
var chai            = require('chai');
var chaiAsPromised  = require('chai-as-promised');
var Sequelize       = require('sequelize');
var Promise         = Sequelize.Promise;
var crypto          = Promise.promisifyAll(require('crypto'));
var fs              = Promise.promisifyAll(require('fs'));
var models          = require('../models');

chai.use(chaiAsPromised);

global.l = l;
global.co = co;
global.chai = chai;
global.expect = chai.expect;
global.chaiAsPromised = chaiAsPromised;
global.fs = fs;


/**
 * get a test database
 */
global.getTestDB = co.wrap(function* () {
  // let logging = console.log;
  let logging = null;
  let hash = yield crypto.randomBytesAsync(15);
  let name = 'test-' + hash.toString('base64').substr(0, 14);
  let sequelize = new Sequelize(name, 'username', 'password', {
    host: 'localhost',
    dialect: 'sqlite',
    storage: ':memory:',
    pool: null,
    // typeValidation: true,
    logging: null, // TODO: output to log file
    define: {
      timestamps: false,
      underscored: true
    }
  });
  let _result = yield sequelize.query('PRAGMA journal_mode=MEMORY');
  return models.getDB(sequelize);
});
