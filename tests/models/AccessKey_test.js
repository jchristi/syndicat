'use strict';

describe('AccessKey', () => {
  it('a valid record should be inserted', async () => {
    for (let i = 1; i <= 2; i++) {
      let sequelize = await getTestDB();
      let models = sequelize.models;
      let usr1 = await models.User.create({
        id: i,
        login: 'sdfasd',
        pwd_hash: 'sdfads'
      });
      let feed1 = await models.Feed.create({
        id: i,
        feed_url: 'https://google.com/',
        owner_uid: i,
        title: 'asdfads'
      })
      let key1 = await models.AccessKey.create({
        id: i,
        access_key: 'sdfadsfds',
        feed_id: i,
        is_cat: false,
        owner_uid: i
      });
      let keys = await models.AccessKey.findAll({ attributes: ['id'] });
      let key = keys[0];
      expect(key).to.have.property('id', i);
      sequelize.close();
    }
  });
  describe('associations', () => {
    it('has User property', async () => {
      expect(readonly.models.AccessKey.associations).to.have.property('User');
    });
    it('has Feed property', async () => {
      expect(readonly.models.AccessKey.associations).to.have.property('Feed');
    });
  });
});
