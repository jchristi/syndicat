'use strict';

describe('Profile', function() {
  var db;
  var _ctx = {};

  describe('associations', function() {
    beforeEach('get models', co.wrap(function* () {
      db = yield getTestDB();
      let _result = yield db.importModels(['Profile']);
      _result = yield db.associateAllModels();
    }));
    it('has User property', function(done) {
      expect(db.Profile.associations).to.have.property('User');
      done();
    });
    it('has UserPreferences property', function(done) {
      expect(db.Profile.associations).to.have.property('UserPreferences');
      done();
    });
  });

});
