'use strict';

describe('FeedCategory', () => {
  test('a valid record should be inserted', async () => {
    expect.assertions(1);
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
    let results = await models.FeedCategory.findAll({ attributes: ['id'] });
    let result = results[0];
    return expect(result).toHaveProperty('id', 1);
  });

  describe('associations', () => {
    test('has User property', async () => {
      let sequelize = await getTestDB();
      expect(sequelize.models.FeedCategory.associations).toHaveProperty('User');
    });

    test('has a Parent property', async () => {
      let sequelize = await getTestDB();
      expect(sequelize.models.FeedCategory.associations).toHaveProperty('Parent');
    });

    test('has a Children property', async () => {
      let sequelize = await getTestDB();
      expect(sequelize.models.FeedCategory.associations).toHaveProperty('Children');
    });
  });

  describe('invalid states validation', () => {
    test('is invalid without a title', async () => {
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
      } catch(e) {
        if (e.name == "SequelizeValidationError" &&
            e.message == "notNull Violation: title cannot be null")
          sequelizeValidationErrorThrown = true;
      }
      expect(sequelizeValidationErrorThrown).toBe(true);
    });
  });
});
