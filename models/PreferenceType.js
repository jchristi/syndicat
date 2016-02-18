'use strict';

module.exports = function(sequelize, DataTypes) {
  var PreferenceType = sequelize.define('PreferenceType', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    type_name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'ttrss_prefs_types',
    classMethods: {
      associate: models => {
        models.importModels(['Preference']);
        models.PreferenceType.hasMany(models.Preference, { foreignKey: 'type_id' });
      }
    }
  });
  return PreferenceType;
};
