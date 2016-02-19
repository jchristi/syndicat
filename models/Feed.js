'use strict';

var co = require('co');
var l = require('lodash');
var moment = require('moment');

// var ModelUtils = require('./util');


// TODO: move these elsewhere!
var DAEMON_UPDATE_LOGIN_LIMIT = 30; // number of days for a user to be 'inactive'
var _DAEMON_FEED_LIMIT = 500;
var _DAEMON_SLEEP_INTERVAL = 120;

var tableNamePrefix = 'ttrss_';

module.exports = function(sequelize, DataTypes) {
  // var model_utils = new ModelUtils(sequelize.options.dialect);
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
      associate: function(models) {
        models.importModels([ 'User', 'FeedCategory', 'Entry', 'Filter2Rule' ]);
        Feed.belongsTo(models.User, { foreignKey: 'owner_uid' });
        Feed.belongsTo(models.FeedCategory, { foreignKey: 'cat_id' });
        Feed.hasMany(models.Entry, { foreignKey: 'feed_id' });
        Feed.hasMany(models.Filter2Rule, { foreignKey: 'feed_id' });
      }

    }, // end class methods


    //
    // model validators
    // NOTE: field validators should be specified elsewhere
    //

    validate: {
      // blagah: () => { throw new Error('BLAGAH!'); };
    }, // end validators


    //
    // scopes (ie. managers in Django)
    //

    scopes: {

      /**
       * Scope: ownersRecentlyLoggedIn
       *
       * return only feeds owned by users who have logged in recently
       */
      ownersRecentlyLoggedIn: () => {
        // if in single user mode, return all feeds
        if (false/*config.SINGLE_USER_MODE*/ ||
            DAEMON_UPDATE_LOGIN_LIMIT < 1) {
          return {};
        }
        return {
          include: [{
            model: sequelize.models.User,
            attributes: [],
            where: {
              last_login: {
                $gte: moment().subtract(DAEMON_UPDATE_LOGIN_LIMIT, 'days').toDate()
              }
            }
          }]
        };
      },

      /**
       * Scope: updateThresholdExceeded
       *
       * return only feeds that have not been updated for awhile
       */
      updateThresholdExceeded: () => {
        // see: http://stackoverflow.com/questions/17976459/utc-date-in-sequelize-js
        var interval = 10000; // XXX
        var _datetime_threshold = Date.now() - interval;
        var _update_interval = Date.now() - interval; // XXX
        var user_pref_exists = {
          model: sequelize.models.UserPreference,
          where: { value: { $ne: -1 } }
        };
        // var col = sequelize.col;
        // var fn = sequelize.fn;
        return {
          $or: [
            {
              update_interval: 0,
              // XXX: can this be done???
              // ttrss_feeds.last_updated < NOW() - CAST((ttrss_user_prefs.value || ' minutes') \
              // AS INTERVAL
              // last_updated: { $lt: datetime_threshold },
              last_updated: { $lt: '' },
              include: [ user_pref_exists ]
            },
            {
             // AND ttrss_feeds.last_updated < NOW() - CAST((ttrss_feeds.update_interval || ]
             // ' minutes') AS INTERVAL)\
              update_interval: { $lt: 0 }
              //last_updated: { $lt: update_interval }
            },
            {
              last_updated: null,
              include: [ user_pref_exists ]
            },
            {
              last_updated: '1970-01-01 00:00:00',
              include: [ user_pref_exists ]
            }
          ]
        };
      },

      /**
       * Scope: notBeingUpdated
       *
       * return feeds that are not currently being updated
       */
      notBeingUpdated: () => {
        return {
          last_update_started: {
            $or: {
              $eq: null,
              $lt: moment().subtract(10, 'minutes').toDate()
            }
          }
        };
      },

      /**
       * Scope: needsUpdate
       *
       * return feeds that need to be updated
       */
      needsUpdate: () => {
        let scopes = sequelize.models.Feed.options.scopes;
        // TODO: consider combining scopes with $and
        return l.defaultsDeep(
          { include: [
            { model: sequelize.models.UserPreference,
              where: {
                pref_name: 'DEFAULT_UPDATE_INTERVAL', // TODO: add const in UserPreference cls
                profile: null
              }
            },
            scopes.ownersRecentlyLoggedIn().include[0]
          ]},
          scopes.updateThresholdExceeded(),
          scopes.notBeingUpdated()
        );
      },

      /**
       * Custom manager to get the top X most subscribed feeds
       */
      mostSubscribed: () => {
        /*function(limit, columns) {
        // TODO: Allow inside a transaction
        limit = (limit !== 'undefined') ? limit : 1000;
        if (typeof columns === 'undefined') {
          columns = ['feed_url', 'site_url', 'title', db.dal.raw('COUNT(id) as subscribers')];
        }
        return db.select(columns)
        .from(table_name)
        // sub-query !!!
        .whereRaw("(SELECT COUNT(id) = 0 FROM "+table_name+" AS tf \
                  WHERE tf.feed_url = ttrss_feeds.feed_url \
                    AND ( private IS true OR auth_login != '' OR auth_pass != '' \
                         OR feed_url LIKE '%:%@%/%'))")
                  .groupByRaw('feed_url, site_url, title')
                  .orderBy('subscribers', 'desc')
                  .limit(limit);
        */
        return {
          where: {
            // include: [[sequelize.fn('COUNT', sequelize.col('id')), 'subscribers']]
            $or: {
              private: true,
              auth_login: { $ne: '' },
              auth_pass: { $ne: '' },
              feed_url: { $like: '%:%@%/%' }
            }
          }
        };
      }

    }, // end scopes


    //
    // instance methods
    //

    instanceMethods: {

      /**
       * This is usually run when a feed is initially created
       */
      subscribe: co.wrap(function* () {
        yield;
        console.log('feed url:', this.feed_url);
      }),

      /**
       * Force update of all feeds
       */
      forceUpdate: function() {
        //this.updateAll("UPDATE ttrss_feeds SET last_update_started =
        //'1970-01-01', last_updated = '1970-01-01'");
      }
    } // end instance methods

  });

  return Feed;
};
