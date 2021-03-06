'use strict';

describe('FeedCategory', function() {
  it('a valid record should be inserted', async () => {
    let sequelize = await getTestDB();
    let models = sequelize.models;
    let usr1 = await models.User.create({
      id: 1,
      login: 'sdfasd',
      pwd_hash: 'sdfads'
    });
    let key1 = await models.FeedCategory.create({
      id: 1,
      title: 'Test Title',
      owner_uid: 1
    });
    let keys = await models.FeedCategory.findAll({ attributes: ['id'] });
    let key = keys[0];
    expect(key).to.have.property('id', 1);
    sequelize.close();
  });

  describe('associations', () => {
    it('has User property', async () => {
      expect(readonly.models.FeedCategory.associations).to.have.property('User');
    });
    it('has a Parent property', async () => {
      expect(readonly.models.FeedCategory.associations).to.have.property('Parent');
    });
    it('has a Children property', async () => {
      expect(readonly.models.FeedCategory.associations).to.have.property('Children');
    });
  });

  describe('invalid states validation', () => {
    it('is invalid without a title', async () => {
      let sequelize = await getTestDB();
      let models = sequelize.models;
      let sequelizeValidationErrorThrown = false;
      try {
        let usr1 = await models.User.create({
          id: 1,
          login: 'sdfasd',
          pwd_hash: 'sdfads'
        });
        let key1 = await models.FeedCategory.create({
          id: 1,
          owner_uid: 1
        });
      } catch (e) {
        if (e.name == "SequelizeValidationError"
            && e.message.indexOf("title cannot be null") !== -1)
          sequelizeValidationErrorThrown = true;
      }
      expect(sequelizeValidationErrorThrown).to.equal(true);
    });
  });
});
