"use strict"

module.exports = function(sequelize, DataTypes) {
  var Profile = sequelize.define('Profile', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    owner_uid: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    }
  }, {
    tableName: 'ttrss_settings_profiles',
    classMethods: {
      associate: models => {
        models.importModels(['User']);
        models.Profile.belongsTo(models.User, { foreignKey: 'owner_uid' });
      }
    }
  });
  return Profile;
};
