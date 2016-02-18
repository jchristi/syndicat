'use strict';

describe('Filter2Rule', function() {
  var db;
  var _ctx = {};

  describe('associations', function() {
    beforeEach('get models', co.wrap(function* () {
      db = yield getTestDB();
      let _result = yield db.importModels(['Filter2Rule']);
      _result = yield db.associateAllModels();
    }));
    it('has FeedCategory property', function(done) {
      expect(db.Filter2Rule.associations).to.have.property('FeedCategory');
      done();
    });
    it('has Feed property', function(done) {
      expect(db.Filter2Rule.associations).to.have.property('Feed');
      done();
    });
    it('has FilterType property', function(done) {
      expect(db.Filter2Rule.associations).to.have.property('FilterType');
      done();
    });
    it('has Filter2 property', function(done) {
      expect(db.Filter2Rule.associations).to.have.property('Filter2');
      done();
    });
  });

});
