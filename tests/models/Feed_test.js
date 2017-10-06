'use strict';

describe('Feed', function(){
  it('1 models', async () => {
    for(let i = 1; i < 2; i++){
      let sequelize = await getTestDB();
      let models = sequelize.models;
      let usr1 = await models.User.create({
        id: i,
        login: 'sdfasd',
        pwd_hash: 'sdfads'
      });
      let feed1 = await models.Feed.create({
        id: i,
        owner_uid: i,
        title: 'test title',
        feed_url: 'google.com',
        icon_url: 'google.com',
        update_interval: 1000000,
        site_url: 'google.com'
      });
      let feeds = await models.Feed.findAll({ attributes: ['id'] });
      let feed = feeds[0];
      expect(feed).to.have.property('id', i);
      sequelize.close();
    }
  });
});
