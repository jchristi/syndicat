'use strict';

var moment = require('moment');

describe('Feed', function() {
  var db; // TODO: this is actually a really dumb way to pass context
  var ctx;

  beforeEach('get db', co.wrap(function* () {
    db = yield getTestDB();
    ctx = {};
  }));
  afterEach('delete db and ctx', function(done){
    db.sequelize.close();
    db = null;
    ctx = {};
    done();
  });

  describe('associations', function() {
    beforeEach('import models', co.wrap(function* (){
      let _result = yield db.loadModels(['Feed']);
    }));
    it('has User property', function(done) {
      expect(db.Feed.associations).to.have.property('User');
      done();
    });
    it('has FeedCategory property', function(done) {
      expect(db.Feed.associations).to.have.property('FeedCategory');
      done();
    });
    it('has Entry property', function(done) {
      expect(db.Feed.associations).to.have.property('Entries');
      done();
    });
    it('has Filter2Rule', function(done) {
      expect(db.Feed.associations).to.have.property('Filter2Rules');
      done();
    });
  });

  describe('scopes', function() {
    beforeEach('import models', co.wrap(function* (){
      let _result = yield db.loadModels(['Feed','User']);
    }));
    describe('ownersRecentlyLoggedIn', function() {
      it('exists', function(done){
        expect(db.Feed.options.scopes).to.have.property('ownersRecentlyLoggedIn');
        done();
      });
      it('does nothing when single user mode is disabled', function(done) {
        // TODO: set config DAEMON_UPDATE_LOGIN_LIMIT to non-zero
        // TODO: set config to SINGLE USER mode
        // expect(db.Feed.scope('ownersRecentlyLoggedIn').$scope).to.not.have.property('include');
        expect(db.Feed.scope('ownersRecentlyLoggedIn').$scope).to.have.property('include');
        // TODO: set config to disable SINGLE USER mode
        // expect(db.Feed.scope('ownersRecentlyLoggedIn').$scope).to.not.have.property('include');
        done();
      });
      it('does nothing when DAEMON_UPDATE_LOGIN_LIMIT is zero', function(done) {
        // TODO: set config to disable SINGLE USER mode
        // TODO: set config DAEMON_UPDATE_LOGIN_LIMIT to non-zero
        expect(db.Feed.scope('ownersRecentlyLoggedIn').$scope).to.have.property('include');
        // TODO: set config DAEMON_UPDATE_LOGIN_LIMIT to zero
        // expect(db.Feed.scope('ownersRecentlyLoggedIn').$scope).to.not.have.property('include');
        done();
      });
      it('includes Users where last login is below the configured threshold', function(done) {
        // TODO: set config to disable SINGLE USER mode
        // TODO: set config DAEMON_UPDATE_LOGIN_LIMIT to non-zero
        let DAEMON_UPDATE_LOGIN_LIMIT = 30;
        let scope = db.Feed.scope('ownersRecentlyLoggedIn').$scope;
        expect(scope).to.have.property('include');
        expect(scope.include.length).to.equal(1);
        expect(scope.include[0]).to.have.property('model');
        expect(scope.include[0].model).to.equal(db.User);
        expect(scope.include[0]).to.have.deep.property('where.last_login.$gte');
        expect(scope.include[0].where.last_login.$gte).to.be.within(
          moment().subtract(DAEMON_UPDATE_LOGIN_LIMIT+1,'days').toDate(),
          moment().subtract(DAEMON_UPDATE_LOGIN_LIMIT-1,'days').toDate()
        );
        done();
      });
    });
    describe('updateThresholdExceeded', function() {
      it('exists', function(done) {
        expect(db.Feed).to.have.deep.property('options.scopes.updateThresholdExceeded');
        done();
      });
      it('has props', function(done) {
        let scope = db.Feed.scope('updateThresholdExceeded').$scope;
        expect(scope).to.have.deep.property('include[0].model');
        expect(scope).to.have.deep.property('include[0].include[0].model');
        expect(scope).to.have.deep.property('include[0].include[0].where.profile', null);
        expect(scope).to.have.deep.property('include[0].include[0].where.pref_name',
                                           'DEFAULT_UPDATE_INTERVAL');
        expect(scope).to.have.deep.property('where.$or');
        expect(scope.where.$or.length).to.equal(4);
        expect(scope.where.$or[0]).to.have.property('update_interval', 0);
        expect(scope.where.$or[0]).to.have.property('last_updated');
        expect(scope.where.$or[0]).to.have.property('$User.UserPreferences.value$');
        expect(scope.where.$or[0]['$User.UserPreferences.value$']).to.have.property('$ne', -1);
        expect(scope.where.$or[1]).to.have.deep.property('update_interval.$gt', 0);
        expect(scope.where.$or[1]).to.have.property('last_updated');
        expect(scope.where.$or[2]).to.have.property('last_updated', null);
        expect(scope.where.$or[2]['$User.UserPreferences.value$']).to.have.property('$ne', -1);
        expect(scope.where.$or[3].last_updated).to.equal('1970-01-01 00:00:00');
        expect(scope.where.$or[3]['$User.UserPreferences.value$']).to.have.property('$ne', -1);
        // TODO: there's got to be a better way to test this...
        done();
      });
    });
    describe('notBeingUpdated', function() {
      it('exists', function(done){
        expect(db.Feed).to.have.deep.property('options.scopes.notBeingUpdated');
        done();
      });
      it('checks last_update_started is more than 10 minutes ago', function(done) {
        let scope = db.Feed.scope('notBeingUpdated').$scope;
        expect(scope).to.have.deep.property('where.last_update_started.$or.$eq', null);
        expect(scope).to.have.deep.property('where.last_update_started.$or.$lt');
        // TODO: mock use of moment() in Feed.js
        expect(scope.where.last_update_started.$or.$lt).to.be.within(
          moment().subtract(11,'minutes').toDate(),
          moment().subtract(9,'minutes').toDate()
        );
        done();
      });
    });
    describe('needsUpdate', function() {
      it('exists', function(done){
        expect(db.Feed).to.have.deep.property('options.scopes.needsUpdate');
        done();
      });
      it('has props', function(done) {
        let scope = db.Feed.scope('needsUpdate').$scope;
        // console.log(require('util').inspect(scope, { depth:10 }));
        expect(scope).to.have.keys(['include','where','order']);
        expect(scope).to.have.deep.property('include[0].where.last_login.$gte');
        expect(scope).to.have.deep.property('include[0].include[0].where.pref_name',
                                            'DEFAULT_UPDATE_INTERVAL');
        expect(scope).to.have.deep.property('include[0].include[0].where.profile', null);
        expect(scope).to.have.deep.property('where.$or[0].update_interval', 0);
        expect(scope).to.have.deep.property('where.$or[0].last_updated.$lt');
        expect(scope.where.$or[0]['$User.UserPreferences.value$']).to.have.property('$ne', -1);
        expect(scope).to.have.deep.property('where.$or[1].update_interval.$gt', 0);
        expect(scope).to.have.deep.property('where.$or[1].last_updated.$lt');
        expect(scope).to.have.deep.property('where.$or[2].last_updated', null);
        expect(scope.where.$or[2]['$User.UserPreferences.value$']).to.have.property('$ne', -1);
        expect(scope).to.have.deep.property('where.$or[3].last_updated', '1970-01-01 00:00:00');
        expect(scope.where.$or[3]['$User.UserPreferences.value$']).to.have.property('$ne', -1);
        expect(scope).to.have.deep.property('where.last_update_started.$or.$eq', null);
        expect(scope).to.have.deep.property('where.last_update_started.$or.$lt');
        expect(scope).to.have.deep.property('order[0][0]', 'last_updated');
        done();
      });

    });
    it('has scope mostSubscribed', function(done){
      expect(db.Feed.options.scopes).to.have.property('mostSubscribed');
      done();
    });
    // describe.skip('with fixtures', function(){
    //   it('ownersRecentlyLoggedIn returns a list of feeds from recently logged in users',
    //   co.wrap(function* () {
    //     let result = yield db.Feed.scope('ownersRecentlyLoggedIn').findAll();
    //     console.log('result', result);
    //   }));
    // });
  });

  describe.skip('with fixtures', function() {
    beforeEach('create Feed fixtures', co.wrap(function* () {
      let _result = yield db.loadModels(['User','Feed']);
      ctx.user1 = yield db.createTestModel('User', { id: 2,
        title: 'Test user', login: 'admin' });
      ctx.feed1 = yield db.createTestModel('Feed', { id: 2,
        title: 'Test feed 1', owner_uid: 2,
        feed_url: 'http://xkcd.com/rss.xml' // 'http://www.winehq.org/news/rss/',
      });
    }));
    it('has User property', co.wrap(function* () {
      let feed = yield db.Feed.findOne({ include: [ db.User ]});
      expect(feed).to.have.property('User');
    }));
    it('has FeedCategory property', co.wrap(function* () {
      let feed = yield db.Feed.findOne({ include: [ db.FeedCategory ]});
      expect(feed).to.have.property('FeedCategory');
    }));
  });
});
