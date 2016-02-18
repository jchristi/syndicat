'use strict';

describe('Feed', function() {
  var db; // TODO: this is actually a really dumb way to pass context
  var ctx = {};

  afterEach('delete db and ctx', function(done){
    // try { db.sequelize.close(); } catch(e) {}
    db.sequelize.close();
    db = null;
    ctx = {};
    done();
  });

  describe('with fixtures', function() {
    beforeEach('create Feed fixtures', co.wrap(function* () {
      db = yield getTestDB();
      let _result = yield db.loadModels(['Feed']);
      // TODO: create and load from json fixture files
      // XXX: create a fixture factory instead???
      ctx.user1 = yield db.User.create({
        id: 2,
        title: 'Test user',
        login: 'admin',
        full_name: 'Admin admin',
        pwd_hash: '*********',
        salt: '*************',
      });
      ctx.feed1 = yield db.Feed.create({
        id: 2,
        title: 'Test feed 1',
        feed_url: 'http://xkcd.com/rss.xml', // 'http://www.winehq.org/news/rss/',
        owner_uid: 2,
      });
    }));
    it('has User property', co.wrap(function* () {
      expect(db.Feed.associations).to.have.property('User');
      let feed = yield db.Feed.findOne({ include: [ db.User ]});
      expect(feed).to.have.property('User');
    }));

    it('has FeedCategory property', co.wrap(function* () {
      expect(db.Feed.associations).to.have.property('FeedCategory');
      let feed = yield db.Feed.findOne({ include: [ db.FeedCategory ]});
      expect(feed).to.have.property('FeedCategory');
    }));
  });

  describe('scopes', function() {
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
