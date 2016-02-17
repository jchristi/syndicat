"use strict"

module.exports = function(sequelize, DataTypes) {
  var UserEntry = sequelize.define('UserEntry', {
    int_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    ref_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    uuid: {
      type: DataTypes.STRING,
      allowNull: false
    },
    feed_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    orig_feed_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    owner_uid: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    marked: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: '0'
    },
    published: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: '0'
    },
    tag_cache: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    label_cache: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    last_read: {
      type: DataTypes.DATE,
      allowNull: true
    },
    score: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    note: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    last_marked: {
      type: DataTypes.DATE,
      allowNull: true
    },
    last_published: {
      type: DataTypes.DATE,
      allowNull: true
    },
    unread: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: '1'
    }
  }, {
    tableName: 'ttrss_user_entries',
    name: {
      singular: 'UserEntry',
      plural: 'UserEntries'
    },
    classMethods: {
      associate: models => {
        models.importModels(['Entry','Feed','ArchivedFeed','User','Tag']);
        UserEntry.belongsTo(models.Entry, { foreignKey: 'ref_id' });
        UserEntry.belongsTo(models.Feed, { foreignKey: 'feed_id' });
        UserEntry.belongsTo(models.ArchivedFeed, { foreignKey: 'orig_feed_id' });
        UserEntry.belongsTo(models.User, { foreignKey: 'owner_uid' });
        UserEntry.hasMany(models.Tag, { foreignKey: 'post_int_id' });
      }
    }
  });
  return UserEntry;
};
