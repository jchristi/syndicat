'use strict';

describe('Filter2', function() {
  var db;
  var _ctx = {};

  describe('associations', function() {
    beforeEach('get models', co.wrap(function* () {
      db = yield getTestDB();
      let _result = yield db.importModels(['Filter2']);
      _result = yield db.associateAllModels();
    }));
    it('has User property', function(done) {
      expect(db.Filter2.associations).to.have.property('User');
      done();
    });
    it('has Filter2Actions property', function(done) {
      expect(db.Filter2.associations).to.have.property('Filter2Actions');
      done();
    });
    it('has Filter2Rules property', function(done) {
      expect(db.Filter2.associations).to.have.property('Filter2Rules');
      done();
    });
  });

});

