"use strict"

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('UserEntry', {
    int_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    ref_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'ttrss_entries',
        // model: 'Entry',
        key: 'id'
      }
    },
    uuid: {
      type: DataTypes.STRING,
      allowNull: false
    },
    feed_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'ttrss_feeds',
        // model: 'Feed',
        key: 'id'
      }
    },
    orig_feed_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'ttrss_archived_feeds',
        // model: 'ArchivedFeed',
        key: 'id'
      }
    },
    owner_uid: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'ttrss_users',
        // model: 'User',
        key: 'id'
      }
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
    freezeTableName: true
  });
};
