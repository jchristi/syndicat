'use strict';

var path = require('path');


module.exports = function(sequelize) {
  let models       = {};
  models.AccessKey = sequelize.import(path.join(__dirname, 'AccessKey.js'));
  models.User      = sequelize.import(path.join(__dirname, 'User.js'));
  models.Feed      = sequelize.import(path.join(__dirname, 'Feed.js'));
  models.Entry     = sequelize.import(path.join(__dirname, 'Entry.js'));
  models.AccessKey.sync();
  models.User.sync();
  models.Feed.sync();
  models.Entry.sync();
  models.Feed.belongsTo(models.User, { foreignKey: 'owner_uid' });
  models.AccessKey.belongsTo(models.User, { foreignKey: 'owner_uid' });
  return models;
};
