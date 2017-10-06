'use strict';

describe('AccessKey', () => {
  test('1 models', async () => {
    let iterations = 1;
    expect.assertions(iterations);
    for (let i = 1; i <= iterations; i++) {
      let sequelize = await getTestDB();
      let models = sequelize.models;
      let usr1 = await models.User.create({
        id: i,
        login: 'sdfasd',
        pwd_hash: 'sdfads'
      });
      let key1 = await models.AccessKey.create({
        id: i,
        access_key: 'sdfadsfds',
        feed_id: 2,
        is_cat: false,
        owner_uid: i
      });
      let keys = await models.AccessKey.findAll({ attributes: ['id'] });
      // console.log(keys);
      expect(key).toHaveProperty('id', i);
    }
  });
});
