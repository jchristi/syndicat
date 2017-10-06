'use strict';

module.exports = function(sequelize, DataTypes) {
  let FilterType = sequelize.define('FilterType', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'ttrss_filter_types'
  });
  return FilterType;
};
