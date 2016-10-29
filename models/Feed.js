'use strict';

var co = require('co');
var l = require('lodash');
var moment = require('moment');

var ModelUtils = require('./util');


// TODO: move these elsewhere!
var DAEMON_UPDATE_LOGIN_LIMIT = 30; // number of days for a user to be 'inactive'
var _DAEMON_FEED_LIMIT = 500;
var _DAEMON_SLEEP_INTERVAL = 120;

var tableNamePrefix = 'ttrss_';

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
        let user_pref_table = sequelize.queryInterface.quoteTable(
          `User.${sequelize.models.User.associations.UserPreferences.as}`);
        let user_pref_col = sequelize.queryInterface.quoteIdentifier('value');
        let user_pref_minutes = util.colToMinutes(`${user_pref_table}.${user_pref_col}`);
        return {
          include: [{
            model: sequelize.models.User,
            attributes: [],
            where: { id: sequelize.col('Feed.owner_uid') },
            include: [{
              model: sequelize.models.UserPreference,
              attributes: [],
              where: {
                owner_uid: sequelize.col('User.id'),
                pref_name: 'DEFAULT_UPDATE_INTERVAL', // TODO: add const in UserPreference
                profile: null
              }
            }]
          }],
          where: {
            $or: [
              {
                update_interval: 0,
                last_updated: { $lt: util.dateSubtract('now', user_pref_minutes) },
                '$User.UserPreferences.value$': { $ne: -1 }
              },
              {
                update_interval: { $gt: 0 },
                last_updated: { $lt: util.dateSubtract('now', user_pref_minutes) }
              },
              {
                last_updated: null,
                '$User.UserPreferences.value$': { $ne: -1 }
              },
              {
                last_updated: '1970-01-01 00:00:00',
                '$User.UserPreferences.value$': { $ne: -1 }
              }
            ]
          },
          order: [ ['last_updated'] ]
        };
      },

      /**
       * Scope: notBeingUpdated
       *
       * return feeds that are not currently being updated
       */
      notBeingUpdated: () => {
        return {
          where: {
            last_update_started: {
              $or: {
                $eq: null,
                // TODO: Use timezones properly
                $lt: moment().subtract(10, 'minutes').toDate()
              }
            }
          }
        };
      },

      /**
       * Scope: needsUpdate
       *
       * return feeds that need to be updated
       */
      needsUpdate: (limit) => {
        let scopes = sequelize.models.Feed.options.scopes;
        // TODO: consider combining scopes with $and
        let it = l.defaultsDeep(
          scopes.ownersRecentlyLoggedIn(),
          scopes.updateThresholdExceeded(),
          scopes.notBeingUpdated()
        );
        if (limit) it.limit = limit;
        return it;
      },

      /**
       * Custom manager to get the top X most subscribed feeds
       */
      mostSubscribed: () => {
        /*function(limit, columns) {
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
       *
       */
      update_daemon_common: co.wrap(function* () {
        let results = yield sequelize.Feed.scope('needsUpdate').fetchAll();

        // magic to prevent double updating of feeds? (todo: use locks or something)

        // mark feed as updated, so it doesn't get double updated
        // db_query(sprintf("UPDATE ttrss_feeds SET last_update_started = NOW()
        // WHERE feed_url IN (%s)", implode(',', $feeds_quoted)));

        // for each feed, update
        // since we have the data cached, we can deal with other feeds with the same url
        // update_rss_feed($tline["id"], true, false);

        results;
      }),

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
