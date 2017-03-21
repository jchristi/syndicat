'use strict';

describe('FeedCategory', function() {
  it('a valid record should be inserted', co.wrap(function* () {
    let sequelize = yield getTestDB();
    let models = sequelize.models;
    let usr1 = yield models.User.create({
      id: 1,
      login: 'sdfasd',
      pwd_hash: 'sdfads'
    });
    let key1 = yield models.FeedCategory.create({
      id: 1,
      title: 'Test Title',
      owner_uid: 1
    });
    let keys = yield models.FeedCategory.findAll({ attributes: ['id'] });
    // console.log(keys);
    let key = keys[0];
    expect(key).to.have.property('id');
    expect(key.id).to.equal(1);
  }));

  describe('associations', function() {
    it('has User property', co.wrap(function* (){
      let sequelize = yield getTestDB();
      expect(sequelize.models.FeedCategory.associations).to.have.property('User');
    }));

    it('has a FedCategory (parent) property', co.wrap(function* (){
      let sequelize = yield getTestDB();
      expect(sequelize.models.FeedCategory.associations).to.have.property('FeedCategory');
    }));
  });

  describe('invalid states validation', function() {
    it('is invalid without a title', co.wrap(function* () {
      let sequelize = yield getTestDB();
      let models = sequelize.models;

      var sequelizeValidationErrorThrown = false;
      try{

        let usr1 = yield models.User.create({
          id: 1,
          login: 'sdfasd',
          pwd_hash: 'sdfads'
        });

        let key1 = yield models.FeedCategory.create({
          id: 1,
          owner_uid: 1
        });
      } catch( e ) {
        if ( e.name == "SequelizeValidationError" && e.message == "notNull Violation: title cannot be null")
          sequelizeValidationErrorThrown = true;
      }

      expect(sequelizeValidationErrorThrown).to.equal(true);
    }));

  });
});
