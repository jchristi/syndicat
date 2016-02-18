'use strict';

describe('FeedCategory', function() {
  var db;
  var ctx = {};

  describe('associations', function() {
    beforeEach('get models', co.wrap(function* () {
      db = yield getTestDB();
      let _result = yield db.importModels(['FeedCategory']);
      _result = yield db.associateAllModels();
    }));
    it('has User property', function(done) {
      expect(db.FeedCategory.associations).to.have.property('User');
      done();
    });
    it('has Feeds property', function(done) {
      expect(db.FeedCategory.associations).to.have.property('Feeds');
      done();
    });
    it('has Filter2Rules property', function(done) {
      expect(db.FeedCategory.associations).to.have.property('Filter2Rules');
      done();
    });
    it('has Children property', function(done) {
      expect(db.FeedCategory.associations).to.have.property('Children');
      done();
    });
    it('has Parent property', function(done) {
      expect(db.FeedCategory.associations).to.have.property('Parent');
      done();
    });
  });

  describe.skip('with fixtures', function() {
    beforeEach('create FeedCategory fixtures', co.wrap(function* () {
      db = yield getTestDB();
      // TODO: why are 'Feed' and 'User' required?
      let _result = yield db.loadModels(['FeedCategory', 'Feed', 'User']);
      ctx.user1 = yield db.createTestModel('User', { id: 2,
        title: 'Test user', login: 'admin' });
      ctx.category1 = yield db.createTestModel('FeedCategory', { id: 2,
        title: 'Entertainment', owner_uid: 2 });
      ctx.category2 = yield db.createTestModel('FeedCategory', { id: 3,
        title: 'Comedy', owner_uid: 2, parent_cat: 2 });
      ctx.feed1 = yield db.createTestModel('Feed', { id: 2,
        title: 'Test feed 1', owner_uid: 2, cat_id: 3,
        feed_url: 'http://xkcd.com/rss.xml' // 'http://www.winehq.org/news/rss/',
      });
    }));
    it('has User property', co.wrap(function* () {
      let cat = yield db.FeedCategory.findOne({ id: 2, include: [ db.User ]});
      expect(cat).to.have.property('User');
    }));
    it('has Children property', co.wrap(function* () {
      let feed = yield db.FeedCategory.findOne({ id: 2, include: [{ model: db.FeedCategory, as: 'Children' }] });
      expect(feed).to.have.property('Children');
    }));
    it('has Parent property', co.wrap(function* () {
      let feed = yield db.FeedCategory.findOne({ id: 3, include: [{ model: db.FeedCategory, as: 'Parent'}] });
      expect(feed).to.have.property('Parent');
    }));
  });

});
