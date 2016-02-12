"use strict"

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Filter2Action', {
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
    action_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '1',
      references: {
        model: 'ttrss_filter_actions',
        // model: 'FilterAction',
        key: 'id'
      }
    },
    action_param: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    }
  }, {
    tableName: 'ttrss_filters2_actions',
    freezeTableName: true
  });
};
