'use strict';

describe('Label', function() {
  var db;
  var _ctx = {};

  describe('associations', function() {
    beforeEach('get models', co.wrap(function* () {
      db = yield getTestDB();
      let _result = yield db.importModels(['Label']);
      _result = yield db.associateAllModels();
    }));
    it('has User property', function(done) {
      expect(db.Label.associations).to.have.property('User');
      done();
    });
    it('has UserLabels property', function(done) {
      expect(db.Label.associations).to.have.property('UserLabels');
      done();
    });
  });

});
