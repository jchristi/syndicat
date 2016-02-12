"use strict"

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Label', {
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
        model: 'ttrss_users',
        // model: 'User',
        key: 'id'
      }
    },
    caption: {
      type: DataTypes.STRING,
      allowNull: false
    },
    fg_color: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    bg_color: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    }
  }, {
    tableName: 'ttrss_labels2',
    freezeTableName: true
  });
};
