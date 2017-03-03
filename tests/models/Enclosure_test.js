'use strict';

describe('Enclosure', function() {
  var db;
  var _ctx = {};

  describe('associations', function() {
    beforeEach('get models', co.wrap(function* () {
      db = yield getTestDB();
      let _result = yield db.importModels(['Enclosure']);
      _result = yield db.associateAllModels();
    }));
    it('has Entry property', function(done) {
      expect(db.Enclosure.associations).to.have.property('Entry');
      done();
    });
  });

  describe.skip('with fixtures', function() {
    beforeEach('create Enclosure fixtures', co.wrap(function* () {
      db = yield getTestDB();
      let _result = yield db.loadModels(['Enclosure','Entry','Feed']);
      _result = yield db.syncAllModels();
      // create Entry and Enclosure
    }));
    // it('has Entry property', co.wrap(function* () {
    //   // let key = yield db.Enclosure.findOne({ id: 2, include: [ db.Entry ]});
    // }));
  });

});
