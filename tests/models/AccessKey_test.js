'use strict';

describe('AccessKey', function() {
  var db;
  var ctx = {};

  beforeEach('create AccessKey fixtures', co.wrap(function* () {
    db = yield getTestDB();
    let _result = yield db.loadModels(['AccessKey']);
    // TODO: adding 'User', 'Feed' makes tests take 42ms?
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
    ctx.key1 = yield db.AccessKey.create({
      id: 2,
      access_key: 'ldafsouahepofnapweofkqpewof',
      feed_id: 2,
      is_cat: false,
      owner_uid: 2
    });
  }));

  // TODO: why is this test taking 42ms?
  it('has User property', co.wrap(function* () {
    expect(db.AccessKey.associations).to.have.property('User');
    let key = yield db.AccessKey.findOne({ id: 2, include: [{ model: db.User, attributes: [ 'id' ] }] });
    expect(key).to.have.property('User');
  }));

  // TODO: why is this test taking 42ms (only if previous test disabled)
  it('has Feed property', co.wrap(function* () {
    expect(db.AccessKey.associations).to.have.property('Feed');
    let key = yield db.AccessKey.findOne({ id: 2, include: [ db.Feed ]});
    expect(key).to.have.property('Feed');
  }));

});
