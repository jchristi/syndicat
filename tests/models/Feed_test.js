"use strict"

describe('Feed', function() {
  var db;
  var ctx = {};

  beforeEach('create Feed fixtures', co.wrap(function* () {
    db = yield getTestDB();
    let _result = yield db.loadModels(['Feed']);
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
      feed_url: 'http://xkcd.com/rss.xml', // 'http://www.winehq.org/news/rss/',
      owner_uid: 2,
    });
  }));

  it('has User property', co.wrap(function* () {
    expect(db.Feed.associations).to.have.property('User');
    let feed = yield db.Feed.findOne({ include: [ db.User ]});
    expect(feed).to.have.property('User');
  }));

  it('has FeedCategory property', co.wrap(function* () {
    expect(db.Feed.associations).to.have.property('FeedCategory');
    let feed = yield db.Feed.findOne({ include: [ db.FeedCategory ]});
    expect(feed).to.have.property('FeedCategory');
  }));

});
