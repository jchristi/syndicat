'use strict';

describe('PluginStorage', function() {
  var db;
  var _ctx = {};

  describe('associations', function() {
    beforeEach('get models', co.wrap(function* () {
      db = yield getTestDB();
      let _result = yield db.importModels(['PluginStorage']);
      _result = yield db.associateAllModels();
    }));
    it('has User property', function(done) {
      expect(db.PluginStorage.associations).to.have.property('User');
      done();
    });
  });

});
