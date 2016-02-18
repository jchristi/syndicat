'use strict';

describe('User', function() {
  var db;
  var ctx = {};

  beforeEach('create User fixtures', co.wrap(function* () {
    db = yield getTestDB()
    let _result = yield db.loadModels(['User']);
    _result = yield db.syncAllModels();
    ctx.user1 = yield db.User.create({
      id: 1,
      login: 'admin',
      full_name: 'Admin admin',
      pwd_hash: '************',
      salt: '***********'
    });
  }));

  it('has Feeds property', co.wrap(function* () {
    expect(db.User.associations).to.have.property('Feeds');
    let user = yield db.User.findOne({ id: 1, include: [ db.Feed ]});
    expect(user).to.have.property('Feeds');
  }));

  it('has FeedCategories property', co.wrap(function* () {
    expect(db.User.associations).to.have.property('FeedCategories');
    let user = yield db.User.findOne({ id: 1, include: [ db.FeedCategory ]});
    expect(user).to.have.property('FeedCategories');
  }));

  it('has AccessKeys property', co.wrap(function* () {
    expect(db.User.associations).to.have.property('AccessKeys');
    let user = yield db.User.findOne({ id: 1, include: [ db.AccessKey ]});
    expect(user).to.have.property('AccessKeys');
  }));

  it('has ArchivedFeeds property', co.wrap(function* () {
    expect(db.User.associations).to.have.property('ArchivedFeeds');
    let user = yield db.User.findOne({ id: 1, include: [ db.ArchivedFeed ]});
    expect(user).to.have.property('ArchivedFeeds');
  }));

});
