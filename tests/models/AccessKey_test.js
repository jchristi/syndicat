'use strict';

describe('AccessKey', function() {
  var db;
  var ctx = {};

  describe('associations', function() {
    beforeEach('get models', co.wrap(function* () {
      db = yield getTestDB();
      let _result = yield db.importModels(['AccessKey']);
      _result = yield db.associateAllModels();
    }));
    it('has User property', function(done) {
      expect(db.AccessKey.associations).to.have.property('User');
      done();
    });
    it('has Feed property', function(done) {
      expect(db.AccessKey.associations).to.have.property('Feed');
      done();
    });
  });

  describe.skip('with fixtures', function() {
    beforeEach('create AccessKey fixtures', co.wrap(function* () {
      db = yield getTestDB();
      // TODO: adding 'User', 'Feed' makes tests take 42ms?
      let _result = yield db.loadModels(['AccessKey','User','Feed']);
      _result = yield db.syncAllModels();
      ctx.user1 = yield db.createTestModel('User', { id: 2 });
      ctx.feed1 = yield db.createTestModel('Feed', { id: 2, owner_uid: 2  });
      ctx.key1 = yield db.createTestModel('AccessKey', { id: 2, feed_id: 2,
        is_cat: false, owner_uid: 2 });
    }));
    // TODO: why is this test taking 42ms?
    it('has User property', co.wrap(function* () {
      let key = yield db.AccessKey.findOne({ id: 2, attributes: ['id'],
        include: [{ model: db.User, attributes: ['id']}]});
      expect(key).to.have.property('User');
    }));
    // TODO: why is this test taking 42ms (only if previous test disabled)
    it('has Feed property', co.wrap(function* () {
      let key = yield db.AccessKey.findOne({ id: 2, attributes: ['id'],
        include: [{ model: db.Feed, attributes: ['id']}]});
      expect(key).to.have.property('Feed');
    }));
  });

});
