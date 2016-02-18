'use strict';

describe('LinkedInstance', function() {
  var db;
  var _ctx = {};

  describe('associations', function() {
    beforeEach('get models', co.wrap(function* () {
      db = yield getTestDB();
      let _result = yield db.importModels(['LinkedInstance']);
      _result = yield db.associateAllModels();
    }));
    it('has LinkedFeeds property', function(done) {
      expect(db.LinkedInstance.associations).to.have.property('LinkedFeeds');
      done();
    });
  });

});
