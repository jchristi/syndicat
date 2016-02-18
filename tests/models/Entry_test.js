'use strict';

describe('Entry', function() {
  var db;
  var _ctx = {};

  describe('associations', function() {
    beforeEach('create Entry fixtures', co.wrap(function* () {
      db = yield getTestDB();
      let _result = yield db.loadModels(['Entry']);
      _result = yield db.associateAllModels();
    }));
    it('has Enclosures property', function(done) {
      expect(db.Entry.associations).to.have.property('Enclosures');
      done();
    });
  });

});
