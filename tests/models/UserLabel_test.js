'use strict';

describe('UserLabel', function() {
  var db;
  var _ctx = {};

  describe('associations', function() {
    beforeEach('get models', co.wrap(function* () {
      db = yield getTestDB();
      let _result = yield db.importModels(['UserLabel']);
      _result = yield db.associateAllModels();
    }));
    it('has Label property', function(done) {
      expect(db.UserLabel.associations).to.have.property('Label');
      done();
    });
    it('has Entry property', function(done) {
      expect(db.UserLabel.associations).to.have.property('Entry');
      done();
    });
  });

});
