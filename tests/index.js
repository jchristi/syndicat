'use strict';

const l               = require('lodash');
const co              = require('co');
const chai            = require('chai');
const chaiAsPromised  = require('chai-as-promised');
const Sequelize       = require('sequelize');
const Promise         = Sequelize.Promise;
const fs              = Promise.promisifyAll(require('fs'));
const loadModels      = require('../models');

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
  let name = 'test-' +  process.hrtime().join('');
  let sequelize = new Sequelize(name, 'username', 'password', {
    host: 'localhost',
    dialect: 'sqlite',
    storage: ':memory:',
    pool: null /* {
                  max: 1,
                  min: 1,
                  idle: 1
                  }*/,
    // typeValidation: true,
    logging: null, //console.log, // TODO: output to log file
    //benchmark: true,
    define: {
      timestamps: false,
      underscored: true
    },
    operatorsAliases: false
  });
  yield sequelize.query('PRAGMA journal_mode=MEMORY');
  let models = loadModels(sequelize);
  return sequelize;
});
