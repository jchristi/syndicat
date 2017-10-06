'use strict';


/**
 * Feed
 *
 * Feeds are a representation of a site stored in Syndicat.
 * Multiple users can have the same feed, but will have different
 * FeedEntries for each.
 */
module.exports = function(sequelize, DataTypes) {
  let Feed = sequelize.define('Feed', {

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
    },
    private: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: '0'
    },
    rtl_content: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: '0'
    },
    hidden: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: '0'
    },
    include_in_digest: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: '1'
    },
    cache_images: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: '0'
    },
    hide_images: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: '0'
    },
    cache_content: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: '0'
    },
    auth_pass_encrypted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: '0'
    },
    last_viewed: {
      type: DataTypes.DATE,
      allowNull: true
    },
    last_update_started: {
      type: DataTypes.DATE,
      allowNull: true
    },
    always_display_enclosures: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: '0'
    },
    update_method: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    order_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    mark_unread_on_update: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: '0'
    },
    update_on_checksum_change: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: '0'
    },
    strip_images: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: '0'
    },
    view_settings: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    pubsub_state: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    favicon_last_checked: {
      type: DataTypes.DATE,
      allowNull: true
    },
    favicon_avg_color: {
      type: DataTypes.STRING,
      allowNull: true
    },
    feed_language: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    }
  },{

    //
    // Options
    //

    tableName: 'ttrss_feeds'

  });

  return Feed;
};

