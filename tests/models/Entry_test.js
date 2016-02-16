"use strict"

describe('Entry', function() {
  var db;
  var ctx = {};

  beforeEach('create Entry fixtures', co.wrap(function* () {
    db = yield getTestDB();
    let _result = yield db.loadModels(['Enclosure','Entry']);
  }));

  it('has Entry property', function(done) {
    expect(db.Entry.associations).to.have.property('Enclosures');
    done();
  });

});
