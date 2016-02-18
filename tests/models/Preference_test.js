'use strict';

describe('Preference', function() {
  var db;
  var _ctx = {};

  describe('associations', function() {
    beforeEach('get models', co.wrap(function* () {
      db = yield getTestDB();
      let _result = yield db.importModels(['Preference']);
      _result = yield db.associateAllModels();
    }));
    it('has PreferenceType property', function(done) {
      expect(db.Preference.associations).to.have.property('PreferenceType');
      done();
    });
    it('has PreferenceSection property', function(done) {
      expect(db.Preference.associations).to.have.property('PreferenceSection');
      done();
    });
    it('has UserPreferences property', function(done) {
      expect(db.Preference.associations).to.have.property('UserPreferences');
      done();
    });
  });

});
