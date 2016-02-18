'use strict';

describe('LinkedFeed', function() {
  var db;
  var _ctx = {};

  describe('associations', function() {
    beforeEach('get models', co.wrap(function* () {
      db = yield getTestDB();
      let _result = yield db.importModels(['LinkedFeed']);
      _result = yield db.associateAllModels();
    }));
    it('has LinkedInstance property', function(done) {
      expect(db.LinkedFeed.associations).to.have.property('LinkedInstance');
      done();
    });
  });

});
