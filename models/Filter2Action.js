'use strict';

module.exports = function(sequelize, DataTypes) {
  let Filter2Action = sequelize.define('Filter2Action', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    filter_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    action_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '1'
    },
    action_param: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    }
  }, {
    tableName: 'ttrss_filters2_actions'
  });
  return Filter2Action;
};
