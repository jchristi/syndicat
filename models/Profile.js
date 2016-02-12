"use strict"

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Profile', {
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
      allowNull: false,
      references: {
        // model: 'ttrss_users',
        model: 'User',
        key: 'id'
      }
    }
  }, {
    tableName: 'ttrss_settings_profiles',
    // freezeTableName: true
  });
};
