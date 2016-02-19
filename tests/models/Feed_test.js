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
        expect(scope).to.have.property('$or');
        expect(scope.$or.length).to.equal(4);
        expect(scope.$or[0]).to.have.keys(['update_interval','last_updated','include']);
        expect(scope.$or[0].update_interval).to.equal(0);
        expect(scope.$or[1]).to.have.keys(['update_interval']);
        expect(scope.$or[1].update_interval).to.have.property('$lt');
        expect(scope.$or[1].update_interval.$lt).to.equal(0);
        expect(scope.$or[2]).to.have.keys(['last_updated','include']);
        expect(scope.$or[2].last_updated).to.be.null;
        expect(scope.$or[3]).to.have.keys(['last_updated','include']);
        expect(scope.$or[3].last_updated).to.equal('1970-01-01 00:00:00');
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
        expect(scope).to.have.deep.property('last_update_started.$or.$eq');
        expect(scope).to.have.deep.property('last_update_started.$or.$lt');
        expect(scope.last_update_started.$or.$eq).to.be.null;
        expect(scope.last_update_started.$or.$lt).to.be.within(
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
        // console.log(scope);
        expect(scope).to.have.keys(['include','$or','last_update_started']);
        expect(scope.include).to.have.length(2);
        expect(scope.include[0]).to.have.property('where');
        expect(scope.include[0].where).to.have.keys(['pref_name','profile']);
        expect(scope.include[0].where.pref_name).to.equal('DEFAULT_UPDATE_INTERVAL');
        expect(scope.include[0].where.profile).to.be.null;
        expect(scope.include[1]).to.have.deep.property('where.last_login.$gte');
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
