'use strict';

var l               = require('lodash');
var co              = require('co');
var chai            = require('chai');
var chaiAsPromised  = require('chai-as-promised');
var Sequelize       = require('sequelize');
var Promise         = Sequelize.Promise;
var fs              = Promise.promisifyAll(require('fs'));
// var models          = require('../models');


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

global.getFeed = co.wrap(function* (){
	return{
		id: 1,
		owner_uid: 1,
		title: 'Test Feed',
		feed_url: 'Test Feed'
	};
});


describe('Feeds', function(){
  it('100 models', co.wrap(function* (){
    for(let i = 1; i < 100; i++){
      let sequelize = yield getTestDB();
      let models = sequelize.models;
      let usr1 = yield models.User.create({
        id: i,
        login: 'sdfasd',
        pwd_hash: 'sdfads'
      });
      let feed1 = yield models.Feed.create({
        id: i,
        owner_uid: i,
        title: 'test title',
        feed_url: 'google.com',
        icon_url: 'google.com',
        update_interval: 1000000,
        site_url: 'google.com'
      });
      let feeds = yield models.Feed.findAll({ attributes: ['id'] });
      let feed = feeds[0];
      expect(feed).to.have.property('id');
      expect(feed.id).to.equal(i);
    }
  }));
  it('200 models', co.wrap(function* (){
    for(let i = 1; i < 200; i++){
      let sequelize = yield getTestDB();
      let models = sequelize.models;
      let usr1 = yield models.User.create({
        id: i,
        login: 'sdfasd',
        pwd_hash: 'sdfads'
      });
      let feed1 = yield models.Feed.create({
        id: i,
        owner_uid: i,
        title: 'test title',
        feed_url: 'google.com',
        icon_url: 'google.com',
        site_url: 'google.com'
      });
      let feeds = yield models.Feed.findAll({ attributes: ['id'] });
      let feed = feeds[0];
      expect(feed).to.have.property('id');
      expect(feed.id).to.equal(i);
    }
  }));
  it('saves and extracts successfully', co.wrap(function* (){
  	let sequelize = yield getTestDB();
    let feed = sequelize.models.Feed;
    yield Feed.sync({force: true});

    let insert = yield getFeed();
    yield Feed.create(insert);

    let retrieve = yield Feed.findById('1');

    expect(retrieve.id).to.equal(insert.id);
    expect(retrieve.owner_uid).to.equal(insert.owner_uid);
    expect(retrieve.title).to.equal(insert.title);
    expect(retrieve.feed_url).to.equal(insert.feed_url);
    expect(retrieve.icon_url).to.equal(insert.icon_url);
    expect(retrieve.update_interval).to.equal(insert.update_interval);
    expect(retrieve.site_url).to.equal(insert.site_url);
  }));
  it('Auto increments on id', co.wrap(function* () {
    let sequelize = yield getTestDB();
    let Feed = sequelize.models.Feed;
    yield Feed.sync({force: true});

    let insert1 = yield getFeed();
    let insert2 = yield getFeed();
    delete(insert1.id);
    delete(insert2.id);
    yield Feed.create(insert1);
    yield Feed.create(insert2);

    let retrieve = yield Feed.findAll();
    expect(retrieve).to.have.lengthOf(2);
    expect(retrieve[1].id).to.equal(retrieve[0].id + 1);
  }));
  it('Requires id to be an integer', co.wrap(function* () {
    let sequelize = yield getTestDB();
    let Feed = sequelize.models.Feed;
    yield Feed.sync({force: true});

    let insert = yield getFeed();
    insert.id = 'STRING';

    let success = false;
    yield Feed.create(insert).then(function(response) {
      success = true;
    }).catch(function(e) {
      expect(e).to.not.be.null;
    });
    assert.isFalse(success, 'Exception not thrown with id as a string');
  }));
  it('Requires id to be unique', co.wrap(function* () {
    let sequelize = yield getTestDB();
    let Feed = sequelize.models.Feed;
    yield Feed.sync({force: true});

    let insert1 = yield getFeed();
    let insert2 = yield getFeed();
    let success = false;
    yield Feed.create(insert1);
    yield Feed.create(insert2).then(function(response) {
      success = true;
    }).catch(function(e) {
      expect(e).to.not.be.null;
    });
    assert.isFalse(success, 'Exception not thrown when id is not unique');
  }));
  it('Requires title to be present', co.wrap(function* () {
    let sequelize = yield getTestDB();
    let Feed = sequelize.models.Feed;
    yield Feed.sync({force: true});

    let insert = yield getFeed();
    delete(insert.title);

    let success = false;
    yield Feed.create(insert).then(function(response) {
      success = true;
    }).catch(function(e) {
      expect(e).to.not.be.null;
    });
    assert.isFalse(success, 'Exception not thrown when title is not present');
  }));
  it('Requires owner_uid to be present', co.wrap(function* () {
    let sequelize = yield getTestDB();
    let Feed = sequelize.models.Feed;
    yield Feed.sync({force: true});

    let insert = yield getFeed();
    delete(insert.owner_uid);

    let success = false;
    yield Feed.create(insert).then(function(response) {
      success = true;
    }).catch(function(e) {
      expect(e).to.not.be.null;
    });
    assert.isFalse(success, 'Exception not thrown when owner_uid is not present');
  }));
  it('Requires feed_url to be present', co.wrap(function* () {
    let sequelize = yield getTestDB();
    let Feed = sequelize.models.Feed;
    yield Feed.sync({force: true});

    let insert = yield getFeed();
    delete(insert.feed_url);

    let success = false;
    yield Feed.create(insert).then(function(response) {
      success = true;
    }).catch(function(e) {
      expect(e).to.not.be.null;
    });
    assert.isFalse(success, 'Exception not thrown when feed_url is not present');
  }));
  it('When update_interval not present default to 0', co.wrap(function* () {
    let sequelize = yield getTestDB();
    let Feed = sequelize.models.Feed;
    yield Feed.sync({force: true});

    let insert = yield getFeed();
    yield Feed.create(insert);

    let retrieve = yield Feed.findById(insert.id);

    expect(retrieve.update_interval).to.equal(0);
  }));
  it('When icon_url not present default to empty string', co.wrap(function* () {
    let sequelize = yield getTestDB();
    let Feed = sequelize.models.Feed;
    yield Feed.sync({force: true});

    let insert = yield getFeed();
    yield Feed.create(insert);

    let retrieve = yield Feed.findById(insert.id);

    expect(retrieve.site_url).to.equal('');
  }));
  it('When purge_interval not present default to 0', co.wrap(function* () {
    let sequelize = yield getTestDB();
    let Feed = sequelize.models.Feed;
    yield Feed.sync({force: true});

    let insert = yield getFeed();
    yield Feed.create(insert);

    let retrieve = yield Feed.findById(insert.id);

    expect(retrieve.purge_interval).to.equal(0);
  }));
  it('When last_error not present default to empty string', co.wrap(function* () {
    let sequelize = yield getTestDB();
    let Feed = sequelize.models.Feed;
    yield Feed.sync({force: true});

    let insert = yield getFeed();
    yield Feed.create(insert);

    let retrieve = yield Feed.findById(insert.id);

    expect(retrieve.last_error).to.equal('');
  }));
  it('When site_url not present default to empty string', co.wrap(function* () {
    let sequelize = yield getTestDB();
    let Feed = sequelize.models.Feed;
    yield Feed.sync({force: true});

    let insert = yield getFeed();
    yield Feed.create(insert);

    let retrieve = yield Feed.findById(insert.id);

    expect(retrieve.site_url).to.equal('');
  }));
  it('When auth_login not present default to empty string', co.wrap(function* () {
    let sequelize = yield getTestDB();
    let Feed = sequelize.models.Feed;
    yield Feed.sync({force: true});

    let insert = yield getFeed();
    yield Feed.create(insert);

    let retrieve = yield Feed.findById(insert.id);

    expect(retrieve.auth_login).to.equal('');
  }));
  it('When auth_pass not present default to empty string', co.wrap(function* () {
    let sequelize = yield getTestDB();
    let Feed = sequelize.models.Feed;
    yield Feed.sync({force: true});

    let insert = yield getFeed();
    yield Feed.create(insert);

    let retrieve = yield Feed.findById(insert.id);

    expect(retrieve.auth_pass).to.equal('');
  }));
  it('When private not present default to 0', co.wrap(function* () {
    let sequelize = yield getTestDB();
    let Feed = sequelize.models.Feed;
    yield Feed.sync({force: true});

    let insert = yield getFeed();
    yield Feed.create(insert);

    let retrieve = yield Feed.findById(insert.id);

    expect(retrieve.private).to.equal(0);
  }));
  it('When rtl_content not present default to 0', co.wrap(function* () {
    let sequelize = yield getTestDB();
    let Feed = sequelize.models.Feed;
    yield Feed.sync({force: true});

    let insert = yield getFeed();
    yield Feed.create(insert);

    let retrieve = yield Feed.findById(insert.id);

    expect(retrieve.rtl_content).to.equal(0);
  }));
  it('When hidden not present default to 0', co.wrap(function* () {
    let sequelize = yield getTestDB();
    let Feed = sequelize.models.Feed;
    yield Feed.sync({force: true});

    let insert = yield getFeed();
    yield Feed.create(insert);

    let retrieve = yield Feed.findById(insert.id);

    expect(retrieve.hidden).to.equal(0);
  }));
  it('When include_in_digest not present default to 1', co.wrap(function* () {
    let sequelize = yield getTestDB();
    let Feed = sequelize.models.Feed;
    yield Feed.sync({force: true});

    let insert = yield getFeed();
    yield Feed.create(insert);

    let retrieve = yield Feed.findById(insert.id);

    expect(retrieve.include_in_digest).to.equal(1);
  }));
  it('When cache_images not present default to 0', co.wrap(function* () {
    let sequelize = yield getTestDB();
    let Feed = sequelize.models.Feed;
    yield Feed.sync({force: true});

    let insert = yield getFeed();
    yield Feed.create(insert);

    let retrieve = yield Feed.findById(insert.id);

    expect(retrieve.cache_images).to.equal(0);
  }));
  it('When hide_images not present default to 0', co.wrap(function* () {
    let sequelize = yield getTestDB();
    let Feed = sequelize.models.Feed;
    yield Feed.sync({force: true});

    let insert = yield getFeed();
    yield Feed.create(insert);

    let retrieve = yield Feed.findById(insert.id);

    expect(retrieve.hide_images).to.equal(0);
  }));
  it('When cache_content not present default to 0', co.wrap(function* () {
    let sequelize = yield getTestDB();
    let Feed = sequelize.models.Feed;
    yield Feed.sync({force: true});

    let insert = yield getFeed();
    yield Feed.create(insert);

    let retrieve = yield Feed.findById(insert.id);

    expect(retrieve.cache_content).to.equal(0);
  }));
  it('When auth_pass_encrypted not present default to 0', co.wrap(function* () {
    let sequelize = yield getTestDB();
    let Feed = sequelize.models.Feed;
    yield Feed.sync({force: true});

    let insert = yield getFeed();
    yield Feed.create(insert);

    let retrieve = yield Feed.findById(insert.id);

    expect(retrieve.auth_pass_encrypted).to.equal(0);
  }));
});












