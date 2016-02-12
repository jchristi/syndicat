"use strict"

describe('FeedCategory', function() {
  var db;
  var ctx = {};

  beforeEach('create FeedCategory fixtures', co.wrap(function* () {
    db = yield getTestDB();
    let _result = yield db.loadModels(['FeedCategory', 'Feed', 'User']); // TODO: why are 'Feed' and 'User' required?
    ctx.user1 = yield db.User.create({
      id: 2,
      title: 'Test user',
      login: 'admin',
      full_name: 'Admin admin',
      pwd_hash: '*********',
      salt: '*************'
    });
    ctx.category1 = yield db.FeedCategory.create({
      id: 2,
      title: 'Entertainment',
      owner_uid: 2
    });
    ctx.category2 = yield db.FeedCategory.create({
      id: 3,
      title: 'Comedy',
      owner_uid: 2,
      parent_cat: 2
    });
    ctx.feed1 = yield db.Feed.create({
      id: 2,
      title: 'Test feed 1',
      feed_url: 'http://xkcd.com/rss.xml', // 'http://www.winehq.org/news/rss/',
      owner_uid: 2,
      cat_id: 3
    });
  }));

  it('has User property', co.wrap(function* () {
    expect(db.FeedCategory.associations).to.have.property('User');
    let cat = yield db.FeedCategory.findOne({ id: 2, include: [ db.User ]});
    expect(cat).to.have.property('User');
  }));

  it('has Children property', co.wrap(function* () {
    expect(db.FeedCategory.associations).to.have.property('Children');
    let feed = yield db.FeedCategory.findOne({ id: 2, include: [{ model: db.FeedCategory, as: 'Children' }] });
    expect(feed).to.have.property('Children');
  }));

  it('has Parent property', co.wrap(function* () {
    expect(db.FeedCategory.associations).to.have.property('Parent');
    let feed = yield db.FeedCategory.findOne({ id: 3, include: [{ model: db.FeedCategory, as: 'Parent'}] });
    expect(feed).to.have.property('Parent');
  }));
});
