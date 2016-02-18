'use strict';

describe('UserPreference', function() {
  var db;
  var _ctx = {};

  describe('associations', function() {
    beforeEach('get models', co.wrap(function* () {
      db = yield getTestDB();
      let _result = yield db.importModels(['UserPreference']);
      _result = yield db.associateAllModels();
    }));
    it('has User property', function(done) {
      expect(db.UserPreference.associations).to.have.property('User');
      done();
    });
    it('has Preference property', function(done) {
      expect(db.UserPreference.associations).to.have.property('Preference');
      done();
    });
    it('has Profile property', function(done) {
      expect(db.UserPreference.associations).to.have.property('Profile');
      done();
    });
  });

});
