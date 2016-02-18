'use strict';

describe('PreferenceSection', function() {
  var db;
  var _ctx = {};

  describe('associations', function() {
    beforeEach('get models', co.wrap(function* () {
      db = yield getTestDB();
      let _result = yield db.importModels(['PreferenceSection']);
      _result = yield db.associateAllModels();
    }));
    it('has Preferences property', function(done) {
      expect(db.PreferenceSection.associations).to.have.property('Preferences');
      done();
    });
  });

});
