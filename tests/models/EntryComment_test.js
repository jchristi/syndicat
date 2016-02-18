'use strict';

describe('EntryComment', function() {
  var db;
  var _ctx = {};

  describe('associations', function() {
    beforeEach('get models', co.wrap(function* () {
      db = yield getTestDB();
      let _result = yield db.importModels(['EntryComment']);
      _result = yield db.associateAllModels();
    }));
    it('has User property', function(done) {
      expect(db.EntryComment.associations).to.have.property('User');
      done();
    });
    it('has Entry property', function(done) {
      expect(db.EntryComment.associations).to.have.property('Entry');
      done();
    });
  });
});
