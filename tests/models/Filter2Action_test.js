'use strict';

describe('Filter2Action', function() {
  var db;
  var _ctx = {};

  describe('associations', function() {
    beforeEach('get models', co.wrap(function* () {
      db = yield getTestDB();
      let _result = yield db.importModels(['Filter2Action']);
      _result = yield db.associateAllModels();
    }));
    it('has Filter2Actions property', function(done) {
      expect(db.Filter2Action.associations).to.have.property('Filter2');
      done();
    });
    it('has Filter2Rules property', function(done) {
      expect(db.Filter2Action.associations).to.have.property('FilterAction');
      done();
    });
  });

});
