"use strict"

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('FilterType', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true/*,
      references: {
        model: '',
        key: ''
      }*/
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
    tableName: 'ttrss_filter_types',
    freezeTableName: true
  });
};
