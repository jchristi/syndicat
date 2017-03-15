'use strict';

var path = require('path');


module.exports = function(sequelize) {
  let models       = {};
  models.AccessKey = sequelize.import(path.join(__dirname, 'AccessKey.js'));
  models.User      = sequelize.import(path.join(__dirname, 'User.js'));
  models.Entry     = sequelize.import(path.join(__dirname, 'Entry.js'));
  models.AccessKey.sync();
  models.User.sync();
  models.Entry.sync();
  models.AccessKey.belongsTo(models.User, { foreignKey: 'owner_uid' });
  return models;
};
