'use strict';

var path = require('path');


module.exports = function(sequelize) {
  let models       = {};
  models.AccessKey = sequelize.import(path.join(__dirname, 'AccessKey.js'));
  models.FeedCategory = sequelize.import(path.join(__dirname, 'FeedCategory.js'));
  models.User      = sequelize.import(path.join(__dirname, 'User.js'));
  models.Feed      = sequelize.import(path.join(__dirname, 'Feed.js'));
  models.AccessKey.sync();
  models.FeedCategory.sync();
  models.User.sync();
  models.Feed.sync();
  models.Feed.belongsTo(models.User, { foreignKey: 'owner_uid' });
  models.AccessKey.belongsTo(models.User, { foreignKey: 'owner_uid' });
  models.FeedCategory.belongsTo(models.User, { foreignKey: 'owner_uid' });
  return models;
};
