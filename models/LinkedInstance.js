"use strict"

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('LinkedInstance', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    last_connected: {
      type: DataTypes.DATE,
      allowNull: false
    },
    last_status_in: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    last_status_out: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    access_key: {
      type: DataTypes.STRING,
      allowNull: false
    },
    access_url: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    tableName: 'ttrss_linked_instances',
    freezeTableName: true
  });
};
