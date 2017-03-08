'use strict';

// Should this be in some parent scope somehow?
var tableNamePrefix = 'ttrss_';

// Oh yeah, that should def be in some parent scope somehow.
var tableName = tableNamePrefix + 'feeds';

module.exports = function(sequelize, DataTypes) {
  var util = new ModelUtils(sequelize.options.dialect);
  var Feed = sequelize.define('Feed', {

    //
    // Attributes
    //

    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    owner_uid: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    cat_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    feed_url: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    icon_url: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    update_interval: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    purge_interval: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    last_updated: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: '0000-00-00 00:00:00'
    },
    last_error: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    site_url: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    auth_login: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    auth_pass: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    parent_feed: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    }
  }, {

    //
    // Options
    //

    tableName: tableNamePrefix + 'feeds',


    //
    // static methods
    //

    classMethods: {

      /**
       * method used to declare all model associations
       * @param {Object} models
       */
    }, // end class methods
  });

  return Feed;
};

