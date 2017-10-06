'use strict';

module.exports = function(sequelize, DataTypes) {
  var LinkedFeed = sequelize.define('LinkedFeed', {
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
    created: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updated: {
      type: DataTypes.DATE,
      allowNull: false
    },
    instance_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    subscribers: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    }
  }, {
    tableName: 'ttrss_linked_feeds',
    classMethods: {
    }
  });
  return LinkedFeed;
};
