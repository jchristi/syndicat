'use strict';

describe('ErrorLog', function() {
  var db;
  var _ctx = {};

  describe('associations', function() {
    beforeEach('get models', co.wrap(function* () {
      db = yield getTestDB();
      let _result = yield db.importModels(['ErrorLog']);
      _result = yield db.associateAllModels();
    }));
    it('has User property', function(done) {
      expect(db.ErrorLog.associations).to.have.property('User');
      done();
    });
  });
});
