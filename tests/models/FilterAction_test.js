'use strict';

describe('FilterAction', function() {
  var db;
  var _ctx = {};

  describe('associations', function() {
    beforeEach('get models', co.wrap(function* () {
      db = yield getTestDB();
      let _result = yield db.importModels(['FilterAction']);
      _result = yield db.associateAllModels();
    }));
    it('has Filter2Actions property', function(done) {
      expect(db.FilterAction.associations).to.have.property('Filter2Actions');
      done();
    });
  });
});
