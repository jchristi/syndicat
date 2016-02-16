"use strict"

describe('Enclosure', function() {
  var db;
  var ctx = {};

  beforeEach('create Enclosure fixtures', co.wrap(function* () {
    db = yield getTestDB();
    let _result = yield db.loadModels(['Enclosure','Entry','Feed']);
    /*
    _result = yield db.syncAllModels();
    ctx.user1 = yield db.User.create({
      id: 2,
      title: 'Test user',
      login: 'admin',
      full_name: 'Admin admin',
      pwd_hash: '*********',
      salt: '*************',
    });
    ctx.feed1 = yield db.Feed.create({
      id: 2,
      title: 'Test feed 1',
      feed_url: 'http://xkcd.com/rss.xml',
      owner_uid: 2,
    });
    ctx.key1 = yield db.Enclosure.create({
      id: 2,
      access_key: 'ldafsouahepofnapweofkqpewof',
      feed_id: 2,
      is_cat: false,
      owner_uid: 2
    });*/
  }));

  it('has Entry property', function(done) {
    expect(db.Enclosure.associations).to.have.property('Entry');
    done();
    // let key = yield db.Enclosure.findOne({ id: 2, include: [ db.Entry ]});
    // expect(key).to.have.property('Entry');
  });

});
