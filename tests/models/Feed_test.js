'use strict';

describe('Feed', function() {
  var db; // TODO: this is actually a really dumb way to pass context
  var ctx = {};

  afterEach('delete db and ctx', function(done){
    db.sequelize.close();
    db = null;
    ctx = {};
    done();
  });

  describe('associations', function() {
    beforeEach('import models', co.wrap(function* (){
      db = yield getTestDB();
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

  describe.skip('with fixtures', function() {
    beforeEach('create Feed fixtures', co.wrap(function* () {
      db = yield getTestDB();
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

  describe.skip('scopes', function() {
    beforeEach('import models', co.wrap(function* (){
      db = yield getTestDB();
      let _result = yield db.loadModels(['Feed','User']);
    }));
    it('has scope ownersRecentlyLoggedIn', function(done){
      expect(db.Feed.options.scopes).to.have.property('ownersRecentlyLoggedIn');
      done();
    });
    it('has scope updateThresholdExceeded', function(done){
      expect(db.Feed.options.scopes).to.have.property('updateThresholdExceeded');
      done();
    });
    it('has scope notBeingUpdated', function(done){
      expect(db.Feed.options.scopes).to.have.property('notBeingUpdated');
      done();
    });
    it('has scope needsUpdate', function(done){
      expect(db.Feed.options.scopes).to.have.property('needsUpdate');
      done();
    });
    it('has scope mostSubscribed', function(done){
      expect(db.Feed.options.scopes).to.have.property('mostSubscribed');
      done();
    });
    describe.skip('with fixtures', function(){
      it('ownersRecentlyLoggedIn returns a list of feeds from recently logged in users',
      co.wrap(function* () {
        let result = yield db.Feed.scope('ownersRecentlyLoggedIn').findAll();
        console.log('result', result);
      }));
    });
  });
});
