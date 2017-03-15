'use strict';

var l               = require('lodash');
var co              = require('co');
var chai            = require('chai');
var chaiAsPromised  = require('chai-as-promised');
var Sequelize       = require('sequelize');
var Promise         = Sequelize.Promise;
var fs              = Promise.promisifyAll(require('fs'));

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
    }
  });
  yield sequelize.query('PRAGMA journal_mode=MEMORY');
  let models = require('../../models')(sequelize);
  return sequelize;
});


describe('Entry', function() {
  it('100 models', co.wrap(function* () {
    for (let i = 1; i < 101; i++) {
      let sequelize = yield getTestDB();
      let models = sequelize.models;
      let usr1 = yield models.User.create({
        id: i,
        login: 'sdfasd',
        pwd_hash: 'sdfads'
      });
      let key1 = yield models.Entry.create({
        id: i,
        title: 'Test Entry',
        guid: i,
        link: 'Test Link',
        updated: new Date(),
        content: 'Test Content',
        content_hash: 'Test Content Hash',
        cached_content: 'Test Cached Content',
        date_entered: new Date(),
        date_updated: new Date(),
        plugin_data: null,
        lang: 'English'
      });

      let keys = yield models.Entry.findAll({ attributes: ['id'] });
      let key = keys[0];
      expect(key).to.have.property('id');
      expect(key.id).to.equal(i);
    }
  }));
});
