"use strict"

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Session', {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true/*,
      references: {
        model: '',
        key: ''
      }*/
    },
    data: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    expire: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    }
  }, {
    tableName: 'ttrss_sessions',
    freezeTableName: true
  });
};
