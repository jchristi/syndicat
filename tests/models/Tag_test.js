'use strict';

describe('Tag', function() {
  var db;
  var _ctx = {};

  describe('associations', function() {
    beforeEach('get models', co.wrap(function* () {
      db = yield getTestDB();
      let _result = yield db.importModels(['Tag']);
      _result = yield db.associateAllModels();
    }));
    it('has User property', function(done) {
      expect(db.Tag.associations).to.have.property('User');
      done();
    });
    it('has UserEntry property', function(done) {
      expect(db.Tag.associations).to.have.property('UserEntry');
      done();
    });
  });

});
