'use strict';

module.exports = function(sequelize, DataTypes) {
  var Preference = sequelize.define('Preference', {
    pref_name: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    type_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    section_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '1'
    },
    access_level: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    def_value: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    tableName: 'ttrss_prefs',
    classMethods: {
      associate: models => {
        models.importModels(['PreferenceType','PreferenceSection','UserPreference']);
        models.Preference.belongsTo(models.PreferenceType, { foreignKey: 'type_id' });
        models.Preference.belongsTo(models.PreferenceSection, { foreignKey: 'section_id' });
        models.Preference.hasMany(models.UserPreference, { foreignKey: 'pref_name' });
      }
    }
  });
  return Preference;
};
