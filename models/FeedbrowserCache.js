"use strict"

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('FeedbrowserCache', {
    feed_url: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    site_url: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    subscribers: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    }
  }, {
    tableName: 'ttrss_feedbrowser_cache'
  });
};
