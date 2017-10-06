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
    }
  });
  return UserPreference;
};
