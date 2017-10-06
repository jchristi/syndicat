'use strict';

var _ = require('lodash');
var path = require('path');


module.exports = function(sequelize) {
  let modelsArr = [
    'AccessKey',
    'ArchivedFeed',
    'Enclosure',
    'Entry',
    'EntryComment',
    'ErrorLog',
    'Feed',
    'FeedCategory',
    'FeedbrowserCache',
    'Filter2',
    'Filter2Action',
    'Filter2Rule',
    'FilterAction',
    'FilterType',
    'Label',
    'LinkedFeed',
    'LinkedInstance',
    'PluginStorage',
    'Preference',
    'PreferenceSection',
    'PreferenceType',
    'Profile',
    'Session',
    'Tag',
    'User',
    'UserEntry',
    'UserLabel',
    'UserPreference',
    'Version'
  ];

  //
  // import all models
  //
  let models = {};
  _.each(modelsArr, function(i) {
    models[i] = sequelize.import(path.join(__dirname, `${i}.js`));
  });

  //
  // call .sync() on all models
  //
  _.each(modelsArr, (i) => { models[i].sync(); });

  //
  // Associations
  //

  models.AccessKey.belongsTo(models.Feed, { foreignKey: 'feed_id' });
  models.AccessKey.belongsTo(models.User, { foreignKey: 'owner_uid' });

  models.ArchivedFeed.belongsTo(models.User, { foreignKey: 'owner_uid' });
  models.ArchivedFeed.hasMany(models.UserEntry, { foreignKey: 'orig_feed_id' });

  models.Enclosure.belongsTo(models.Entry, { foreignKey: 'post_id' });

  models.Entry.hasMany(models.Enclosure, { foreignKey: 'post_id' });
  models.Entry.hasMany(models.EntryComment, { foreignKey: 'ref_id' });
  models.Entry.hasMany(models.UserEntry, { foreignKey: 'ref_id' }); // TODO: as 'UserEntries' ?
  models.Entry.hasMany(models.UserLabel, { foreignKey: 'label_id' });

  models.EntryComment.belongsTo(models.User, { foreignKey: 'owner_uid' });
  models.EntryComment.belongsTo(models.Entry, { foreignKey: 'ref_id' });

  models.ErrorLog.belongsTo(models.User, { foreignKey: 'owner_uid' });

  models.Feed.belongsTo(models.User, { foreignKey: 'owner_uid' });
  models.Feed.belongsTo(models.FeedCategory, { foreignKey: 'cat_id' });
  models.Feed.hasMany(models.Entry, { foreignKey: 'feed_id' });
  models.Feed.hasMany(models.Filter2Rule, { foreignKey: 'feed_id' });

  models.FeedCategory.belongsTo(models.User, { foreignKey: 'owner_uid' });
  models.FeedCategory.belongsTo(models.FeedCategory, { foreignKey: 'parent_cat', as: 'Parent' });
  models.FeedCategory.hasMany(models.FeedCategory, { foreignKey: 'parent_cat', as: 'Children'});
  models.FeedCategory.hasMany(models.Feed, { foreignKey: 'cat_id' });
  models.FeedCategory.hasMany(models.Filter2Rule, { foreignKey: 'cat_id' });

  models.Filter2.belongsTo(models.User, { foreignKey: 'owner_uid' });
  models.Filter2.hasMany(models.Filter2Action, { foreignKey: 'filter_id' });
  models.Filter2.hasMany(models.Filter2Rule, { foreignKey: 'filter_id' });

  models.Filter2Action.belongsTo(models.Filter2, { foreignKey: 'filter_id' });
  models.Filter2Action.belongsTo(models.FilterAction, { foreignKey: 'action_id' });

  models.Filter2Rule.belongsTo(models.FeedCategory, { foreignKey: 'cat_id' });
  models.Filter2Rule.belongsTo(models.Feed, { foreignKey: 'feed_id' });
  models.Filter2Rule.belongsTo(models.FilterType, { foreignKey: 'filter_type' });
  models.Filter2Rule.belongsTo(models.Filter2, { foreignKey: 'filter_id' });

  models.FilterAction.hasMany(models.Filter2Action, { foreignKey: 'action_id' });

  models.FilterType.hasMany(models.Filter2Rule, { foreignKey: 'filter_type' });

  models.Label.belongsTo(models.User, { foreign_key: 'owner_uid' });
  models.Label.hasMany(models.UserLabel, { foreign_key: 'label_id' });

  models.LinkedFeed.belongsTo(models.LinkedInstance, { foreignKey: 'instance_id' });

  models.LinkedInstance.hasMany(models.LinkedFeed, { foreignKey: 'instance_id' });

  models.PluginStorage.belongsTo(models.User, { foreignKey: 'owner_uid' });

  models.Preference.belongsTo(models.PreferenceType, { foreignKey: 'type_id' });
  models.Preference.belongsTo(models.PreferenceSection, { foreignKey: 'section_id' });
  models.Preference.hasMany(models.UserPreference, { foreignKey: 'pref_name' });

  models.PreferenceSection.hasMany(models.Preference, { foreignKey: 'section_id' });

  models.PreferenceType.hasMany(models.Preference, { foreignKey: 'type_id' });

  models.Profile.belongsTo(models.User, { foreignKey: 'owner_uid' });
  models.Profile.hasMany(models.UserPreference, { foreignKey: 'profile' });

  models.Tag.belongsTo(models.User, { foreignKey: 'owner_uid' });
  models.Tag.belongsTo(models.UserEntry, { foreignKey: 'post_int_id' });

  models.User.hasMany(models.Feed, { foreignKey: 'owner_uid' });
  models.User.hasMany(models.FeedCategory, { foreignKey: 'owner_uid' });
  models.User.hasMany(models.ArchivedFeed, { foreignKey: 'owner_uid' });
  models.User.hasMany(models.AccessKey, { foreignKey: 'owner_uid' });
  models.User.hasMany(models.EntryComment, { foreignKey: 'owner_uid' });
  models.User.hasMany(models.ErrorLog, { foreignKey: 'owner_uid' });
  models.User.hasMany(models.Filter2, { foreignKey: 'owner_uid' });
  models.User.hasMany(models.Label, { foreignKey: 'owner_uid' });
  models.User.hasMany(models.PluginStorage, { foreignKey: 'owner_uid' });
  models.User.hasMany(models.Profile, { foreignKey: 'owner_uid' }); // TODO: hasMany or hasOne?
  models.User.hasMany(models.Tag, { foreignKey: 'owner_uid' });
  models.User.hasMany(models.UserEntry, { foreignKey: 'owner_uid' }); // TODO: as 'UserEntries'?
  models.User.hasMany(models.UserPreference, { foreignKey: 'owner_uid' });

  models.UserEntry.belongsTo(models.Entry, { foreignKey: 'ref_id' });
  models.UserEntry.belongsTo(models.Feed, { foreignKey: 'feed_id' });
  models.UserEntry.belongsTo(models.ArchivedFeed, { foreignKey: 'feed_id' });
  models.UserEntry.belongsTo(models.User, { foreignKey: 'owner_uid' });
  models.UserEntry.hasMany(models.Tag, { foreignKey: 'post_int_id' });

  models.UserLabel.belongsTo(models.Label, { foreignKey: 'label_id' });
  models.UserLabel.belongsTo(models.Entry, { foreignKey: 'article_id' });

  models.UserPreference.belongsTo(models.User, { foreignKey: 'owner_uid' });
  models.UserPreference.belongsTo(models.Preference, { foreignKey: 'pref_name' });
  models.UserPreference.belongsTo(models.Profile, { foreignKey: 'profile' });

  return models;
};
