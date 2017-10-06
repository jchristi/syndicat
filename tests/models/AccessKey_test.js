'use strict';

describe('AccessKey', () => {
  test('1 models', co.wrap(function* () {
    for (let i = 1; i < 1; i++) {
      let sequelize = yield getTestDB();
      let models = sequelize.models;
      let usr1 = yield models.User.create({
        id: i,
        login: 'sdfasd',
        pwd_hash: 'sdfads'
      });
      let key1 = yield models.AccessKey.create({
        id: i,
        access_key: 'sdfadsfds',
        feed_id: 2,
        is_cat: false,
        owner_uid: i
      });
      let keys = yield models.AccessKey.findAll({ attributes: ['id'] });
      // console.log(keys);
      let key = keys[0];
      expect(key).to.have.property('id');
      expect(key.id).to.equal(i);
    }
  }));
});
