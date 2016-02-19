'use strict';

var l         = require('lodash');
var co        = require('co');
var path      = require("path");
var Sequelize = require("sequelize");
var Promise   = Sequelize.Promise;
var fs        = Promise.promisifyAll(require('fs'));

/**
 * constructor
 */
function DB(sequelize) {
  // TODO: throw error if sequelize is null
  this.sequelize = sequelize;
  this.Sequelize = Sequelize;
  this.model_dir = __dirname;
  this.models_imported = [];
  this.models_synced = [];
  this.log = console.log;
  this.log = () => {};
}

// load models
DB.prototype.loadModels = co.wrap(function* (model_names) {
  let models_imported = this.importModels(model_names);
  this.associateAllModels();
  let models_synced = yield this.syncAllModels();
  return l.intersection(models_imported, models_synced);
});

// load all models
DB.prototype.loadAllModels = co.wrap(function* () {
  let models_imported = yield this.importAllModels();
  this.associateAllModels();
  let models_synced = yield this.syncAllModels();
  return l.intersection(models_imported, models_synced);
});

// import models
DB.prototype.importModels = function(model_names) {
  // don't load the same model twice
  // model_names = model_names - this.models_imported;
  model_names = model_names.filter(model_name => {
    return !l.includes(this.models_imported, model_name);
  });

  // if no models to import, then return now
  if (model_names.length === 0)
    return [];

  var models_imported = [];
  model_names.forEach(model_name => {
    let model = this.sequelize.import(path.join(this.model_dir, model_name + '.js'));
    this[model_name] = model;
    models_imported.push(model_name);
    this.models_imported = l.union(this.models_imported, [model_name]);
  });

  return models_imported;
};

// import all models
DB.prototype.importAllModels = co.wrap(function* () {
  let filenames = yield fs.readdirAsync(this.model_dir);

  // get list of model filenames
  // only return valid javascript model files
  let model_filenames = filenames.filter(file => {
    return file.indexOf('.') !== 0 &&
      file !== 'index.js' &&
      file[0] === file[0].toUpperCase() &&
      file.substr(-3) === '.js';
  });

  // import models using found valid files
  var models_imported = [];
  model_filenames.forEach(file => {
    let model = this.sequelize.import(path.join(this.model_dir, file));
    this[model.name] = model;
    models_imported.push(model.name);
    this.models_imported = l.union(this.models_imported, [model.name]);
  });

  return models_imported;
});

// run associations on all imported models
DB.prototype.associateAllModels = function() {
  var models_associated = [];
  this.models_imported.forEach(model_name => {
    if ('associate' in this[model_name] &&
       typeof this[model_name].associate === 'function') {
      this[model_name].associate(this);
      models_associated.push(model_name);
    }
    if ('addScopes' in this[model_name] &&
       typeof this[model_name].addScopes === 'function') {
      console.log('adding scopes for '+model_name);
      this[model_name].addScopes(this);
    }
  });
  return models_associated;
};

// Sync models
DB.prototype.syncModels = co.wrap(function* (model_names) {
  let _result = yield this.sequelize.sync();
  var self = this;
  model_names.forEach(co.wrap(function* (model_name) {
    if ('sync' in self[model_name]) {
      let _result = yield self.sequelize.sync();
      _result = yield self[model_name].sync();
      self.models_synced = l.union(self.models_synced, [model_name]);
      self.log('Synced', model_name);
    }
  }));
  // _result = yield sequelize.sync();
  return this.models_synced;
});

// Sync all models
DB.prototype.syncAllModels = function() {
  return this.syncModels(this.models_imported);
};


/**
 * Create a database/model object
 */
module.exports.getDB = co.wrap(function* (sequelize) {
  // TODO: Hook this up to configuration
  //var env       = process.env.SYNDICAT_ENV || "development";
  //var config    = require(path.join(__dirname, '..', 'config', 'config.json'))[env];
  let created = false;
  if (!sequelize) {
    sequelize = new Sequelize('syndicat', 'username', 'password', {
      host: 'localhost',
      dialect: 'sqlite',
      pool: {
        max: 10,
        min: 0,
        idle: 10000
      },
      storage: 'syndicat.db',
      //typeValidation: true,
      define: {
        timestamps: false,
        underscored: true
      }
    });
    created = true;
  }
  let db = new DB(sequelize);
  if (created) {
    let _models_imported = yield db.importAllModels();
    db.associateAllModels();
    return db;
  }
  return Promise.resolve(db);
});
