"use strict"

describe('ArchivedFeed', function() {
  var db;
  var ctx = {};

  beforeEach('create ArchivedFeed fixtures', co.wrap(function* () {
    db = yield getTestDB();
    let _result = yield db.loadModels(['User', 'ArchivedFeed']);
    _result = yield db.syncAllModels();
    ctx.user1 = yield db.User.create({
      id: 2,
      title: 'Test user',
      login: 'admin',
      full_name: 'Admin admin',
      pwd_hash: '*********',
      salt: '*************',
    });
    ctx.feed1 = yield db.ArchivedFeed.create({
      id: 2,
      title: 'Test feed 1',
      feed_url: 'http://xkcd.com/rss.xml',
      owner_uid: 2,
    });
  }));

  it('has User property', co.wrap(function* () {
    expect(db.ArchivedFeed.associations).to.have.property('User');
    let afeed = yield db.ArchivedFeed.findOne({ id: 2, include: [ db.User ]});
    expect(afeed).to.have.property('User');
  }));

});
