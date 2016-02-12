"use strict"

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('UserPreference', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    owner_uid: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        // model: 'ttrss_users',
        model: 'User',
        key: 'id'
      }
    },
    pref_name: {
      type: DataTypes.STRING,
      allowNull: true,
      references: {
        // model: 'ttrss_prefs',
        model: 'Preference',
        key: 'pref_name'
      }
    },
    value: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    profile: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        // model: 'ttrss_settings_profiles',
        model: 'Profile',
        key: 'id'
      }
    }
  }, {
    tableName: 'ttrss_user_prefs',
    // freezeTableName: true
  });
};
