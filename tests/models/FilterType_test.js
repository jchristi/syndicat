'use strict';

describe('FilterType', function() {
  var db;
  var _ctx = {};

  describe('associations', function() {
    beforeEach('get models', co.wrap(function* () {
      db = yield getTestDB();
      let _result = yield db.importModels(['FilterType']);
      _result = yield db.associateAllModels();
    }));
    it('has Filter2Rules property', function(done) {
      expect(db.FilterType.associations).to.have.property('Filter2Rules');
      done();
    });
  });
});
