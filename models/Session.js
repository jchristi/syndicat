"use strict"

module.exports = function(sequelize, DataTypes) {
  var Session = sequelize.define('Session', {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
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
  });
  return Session;
};
