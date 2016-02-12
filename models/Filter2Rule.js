"use strict"

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Filter2Rule', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    filter_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'ttrss_filters2',
        // model: 'Filter2',
        key: 'id'
      }
    },
    reg_exp: {
      type: DataTypes.STRING,
      allowNull: false
    },
    inverse: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: '0'
    },
    filter_type: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'ttrss_filter_types',
        // model: 'FilterType',
        key: 'id'
      }
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
    cat_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'ttrss_feed_categories',
        // model: 'FeedCategory',
        key: 'id'
      }
    },
    cat_filter: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: '0'
    }
  }, {
    tableName: 'ttrss_filters2_rules',
    freezeTableName: true
  });
};
