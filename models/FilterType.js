'use strict';

module.exports = function(sequelize, DataTypes) {
  var FilterType = sequelize.define('FilterType', {
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
    tableName: 'ttrss_filter_types',
    classMethods: {
      associate: models => {
        models.importModels(['Filter2Rule']);
        FilterType.hasMany(models.Filter2Rule, { foreignKey: 'filter_type' });
      }
    }
  });
  return FilterType;
};
