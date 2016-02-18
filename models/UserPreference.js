'use strict';

module.exports = function(sequelize, DataTypes) {
  var UserPreference = sequelize.define('UserPreference', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    owner_uid: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    pref_name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    value: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    profile: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    }
  }, {
    tableName: 'ttrss_user_prefs',
    classMethods: {
      associate: models => {
        models.importModels(['User','Preference','Profile']);
        UserPreference.belongsTo(models.User, { foreignKey: 'owner_uid' });
        UserPreference.belongsTo(models.Preference, { foreignKey: 'pref_name' });
        UserPreference.belongsTo(models.Profile, { foreignKey: 'profile' });
      }
    }
  });
  return UserPreference;
};
