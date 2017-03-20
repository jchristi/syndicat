'use strict';

describe('Feed', function(){
  it('100 models', co.wrap(function* (){
    for(let i = 1; i < 100; i++){
      let sequelize = yield getTestDB();
      let models = sequelize.models;
      let usr1 = yield models.User.create({
        id: i,
        login: 'sdfasd',
        pwd_hash: 'sdfads'
      });
      let feed1 = yield models.Feed.create({
        id: i,
        owner_uid: i,
        title: 'test title',
        feed_url: 'google.com',
        icon_url: 'google.com',
        update_interval: 1000000,
        site_url: 'google.com'
      });
      let feeds = yield models.Feed.findAll({ attributes: ['id'] });
      let feed = feeds[0];
      expect(feed).to.have.property('id');
      expect(feed.id).to.equal(i);
    }
  }));
  it('200 models', co.wrap(function* (){
    for(let i = 1; i < 200; i++){
      let sequelize = yield getTestDB();
      let models = sequelize.models;
      let usr1 = yield models.User.create({
        id: i,
        login: 'sdfasd',
        pwd_hash: 'sdfads'
      });
      let feed1 = yield models.Feed.create({
        id: i,
        owner_uid: i,
        title: 'test title',
        feed_url: 'google.com',
        icon_url: 'google.com',
        update_interval: 1000000,
        site_url: 'google.com'
      });
      let feeds = yield models.Feed.findAll({ attributes: ['id'] });
      let feed = feeds[0];
      expect(feed).to.have.property('id');
      expect(feed.id).to.equal(i);
    }
  }));
});
