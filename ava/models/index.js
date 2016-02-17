'use strict';

var Sequelize = require('sequelize');
var co = require('co');
var fs = Sequelize.Promise.promisifyAll(require('fs'));
var path = require('path');
var _ = require('lodash');


/**
 * Create a transaction
 */
var getTx = function(sequelize) {
  return sequelize.transaction({
    autocommit: false,
    isolationLevel: "SERIALIZABLE"
  });
};
exports.getTx = getTx;

/**
 * get a test database
 * @param String name of the test
 * @param Array model_names as strings that are required
 */
var getDB = co.wrap(function* (name) {
  var db = {};
  var basedir = path.dirname(path.dirname(__dirname));
  var sequelize = new Sequelize(name, 'username', 'password', {
    host: 'localhost',
    dialect: 'sqlite',
    pool: null,
    storage: ':memory:',
    //typeValidation: true,
    // logging: null, // TODO: output to log file
    define: {
      timestamps: false,
      underscored: true
    }
  });

  let _result = yield sequelize.query('PRAGMA journal_mode=MEMORY');

  // get a transaction
  // db.tx = yield getTx(sequelize);

  db.sequelize = sequelize;
  db.Sequelize = Sequelize;

  // import models
  db.loadModels = co.wrap(function* (model_names) {
    let model_dir = path.join(basedir, 'models');
    let filenames = yield fs.readdirAsync(model_dir);
    // TODO: create common method for re-use by test and actual model index.js files
    let model_filenames = filenames.filter(function(file) {
      if (model_names instanceof Array &&
          model_names.indexOf(file.replace('.js','')) === -1)
        return false;
      return (file.indexOf('.') !== 0) && (file !== 'index.js') &&
        file.substr(-3) === '.js';
    });
    // TODO: create common method for re-use by test and actual model index.js files
    model_filenames.forEach(file => {
      let model = sequelize.import(path.join(model_dir, file));
      console.log('Loaded', file);
      // TODO: must load model dependencies too!
      // modify methods to auto-use db.tx
      // let t = { transaction: db.tx };
      // model.syncInTx = attrs => model.sync(_.merge(t, attrs));
      // model.createInTx = attrs => model.create(attrs, t);
      // model.updateInTx = attrs => model.update(attrs, t);
      // model.updateAttributesInTx = attrs => model.updateAttributes(attrs, t);
      // XXX: other methods...
      db[model.name] = model;
    });
    var _result = yield sequelize.sync();
    for(let i in Object.keys(db)) {
      let model_name = Object.keys(db)[i];
      console.log('model_name',model_name);
      if ('associate' in db[model_name]) {
        db[model_name].associate(db);
        console.log('running associations for', model_name);
      }
      if ('sync' in db[model_name]) {
        _result = yield db[model_name].sync();
        _result = yield sequelize.sync();
        console.log('Synced', model_name);
      }
    }
    // _result = yield sequelize.sync();
  });

  return db;
});
exports.getDB = getDB;

//
// Custom assertions
//
var Assertions = function(t) {
  this.t = t;
};
exports.Assertions = Assertions;

/**
 * Check if a model has an associated model given the assoc
 * model name as a string.
 *
 * @param {Object} model the model to check
 * @param {String} assoc_model_name the name of the associated model to look for
 */
Assertions.prototype.hasAssocModel = function(t, model, assoc_model_name) {
  // let expected = 'function';
  // let methods = [ 'get', 'count', 'has', 'set' ];
  // for (let i = 0; i < 4; i++) {
  //   let method_name = methods[i] + assoc_model_name;
  //   console.log(method_name);
  //   console.log(model);
  //   let actual = typeof model[method];
  //   t.is(actual, expected, 'Did not find method: ' + method_name);
  // }
};
