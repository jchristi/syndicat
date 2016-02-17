"use strict"

var co = require('co');

module.exports = function(sequelize, DataTypes) {

  /**
   * ArchivedFeed
   */
  var ArchivedFeed = sequelize.define('ArchivedFeed', {

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

    tableName: 'ttrss_archived_feeds',

    //
    // static methods
    //

    classMethods: {

      /**
       * method used to declare all model associations
       * @param {Object} models
       */
      associate: function(models) {
        models.importModels(['User','UserEntry']);
        ArchivedFeed.belongsTo(models.User, { foreignKey: 'owner_uid' });
        ArchivedFeed.hasMany.(models.UserEntry { foreignKey: 'orig_feed_id' });
      }

    } // end static methods

  });

  return ArchivedFeed;
};
