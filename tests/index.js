'use strict';

var l               = require('lodash');
var co              = require('co');
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
 * model factory
 */
var createTestModel = co.wrap(function* (model_name, attrs) {
  attrs = (attrs == null) ? {} : attrs;
  let _loaded_models = yield this.loadModels([model_name]);
  let model = this[model_name];
  l.forIn(model.attributes, (attr, key) => {
    if (l.has(attrs, key)) return;
    if (!l.has(attr, '_modelAttribute')) return;
    if (attr.allowNull) return;
    if (attr.defaultValue) return;
    // random int
    if (l.has(attr, 'type._unsigned')) {
      attrs[key] = Math.floor(Math.random() * (99999) + 1);
    } else {
    // random string
      let hash = crypto.randomBytes(14);
      attrs[key] = hash.toString('hex').substr(0,8);
    }
  });
  return yield model.create(attrs);
});


/**
 * get a test database
 */
global.getTestDB = co.wrap(function* () {
  // let _logging = console.log;
  let _logging = null;
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
  let db = yield models.getDB(sequelize);
  db.createTestModel = createTestModel;
  return db;
});
