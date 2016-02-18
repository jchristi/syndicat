'use strict';

describe('User', function() {
  var db;
  var ctx = {};

  describe('associations', function() {
    beforeEach('get models', co.wrap(function* () {
      db = yield getTestDB();
      let _result = yield db.importModels(['User']);
      _result = yield db.associateAllModels();
    }));
    it('has Feeds property', function(done) {
      expect(db.User.associations).to.have.property('Feeds');
      done();
    });
    it('has FeedCategories property', function(done) {
      expect(db.User.associations).to.have.property('FeedCategories');
      done();
    });
    it('has AccessKeys property', function(done) {
      expect(db.User.associations).to.have.property('AccessKeys');
      done();
    });
    it('has ArchivedFeeds property', function(done) {
      expect(db.User.associations).to.have.property('ArchivedFeeds');
      done();
    });
  });

  describe.skip('with fixtures', function() {
    beforeEach('create User fixtures', co.wrap(function* () {
      db = yield getTestDB();
      let _result = yield db.loadModels(['User']);
      _result = yield db.syncAllModels();
      ctx.user1 = yield db.createTestModel('User', { id: 1 });
    }));
    it('has Feeds property', co.wrap(function* () {
      let user = yield db.User.findOne({ id: 1, attributes: ['id'],
        include: [{ model:db.Feed, attributes: ['id']}]});
      expect(user).to.have.property('Feeds');
    }));
    it('has FeedCategories property', co.wrap(function* () {
      let user = yield db.User.findOne({ id: 1, attributes: ['id'],
        include: [{ model: db.FeedCategory, attributes: ['id']}]});
      expect(user).to.have.property('FeedCategories');
    }));
    it('has AccessKeys property', co.wrap(function* () {
      let user = yield db.User.findOne({ id: 1, attributes: ['id'],
        include: [{ model: db.AccessKey, attributes: ['id']}]});
      expect(user).to.have.property('AccessKeys');
    }));
    it('has ArchivedFeeds property', co.wrap(function* () {
      let user = yield db.User.findOne({ id: 1, attributes: ['id'],
        include: [{ model: db.ArchivedFeed, attributes: ['id']}]});
      expect(user).to.have.property('ArchivedFeeds');
    }));
  });

});
