'use strict';

module.exports = function(sequelize, DataTypes) {

  /**
   * ArchivedFeed
   */
  let ArchivedFeed = sequelize.define('ArchivedFeed', {

    //
    // Attributes
    //

    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    owner_uid: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    feed_url: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    site_url: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    }
  }, {

    //
    // Options
    //

    tableName: 'ttrss_archived_feeds'

  });

  return ArchivedFeed;
};
