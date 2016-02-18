'use strict';

describe('PreferenceType', function() {
  var db;
  var _ctx = {};

  describe('associations', function() {
    beforeEach('get models', co.wrap(function* () {
      db = yield getTestDB();
      let _result = yield db.importModels(['PreferenceType']);
      _result = yield db.associateAllModels();
    }));
    it('has Preferences property', function(done) {
      expect(db.PreferenceType.associations).to.have.property('Preferences');
      done();
    });
  });

});
