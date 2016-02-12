"use strict"

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('CategoryCounterCache', {
    feed_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    owner_uid: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    value: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    updated: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    tableName: 'ttrss_cat_counters_cache',
    freezeTableName: true
  });
};
