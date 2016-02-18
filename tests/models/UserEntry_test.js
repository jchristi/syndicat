'use strict';

describe('UserEntry', function() {
  var db;
  var _ctx = {};

  describe('associations', function() {
    beforeEach('get models', co.wrap(function* () {
      db = yield getTestDB();
      let _result = yield db.importModels(['UserEntry']);
      _result = yield db.associateAllModels();
    }));
    it('has Entry property', function(done) {
      expect(db.UserEntry.associations).to.have.property('Entry');
      done();
    });
    it('has Feed property', function(done) {
      expect(db.UserEntry.associations).to.have.property('Feed');
      done();
    });
    it('has ArchivedFeed property', function(done) {
      expect(db.UserEntry.associations).to.have.property('ArchivedFeed');
      done();
    });
    it('has User property', function(done) {
      expect(db.UserEntry.associations).to.have.property('User');
      done();
    });
    it('has Tags property', function(done) {
      expect(db.UserEntry.associations).to.have.property('Tags');
      done();
    });
  });

});
