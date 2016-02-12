"use strict"

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Preference', {
    pref_name: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    type_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        // model: 'ttrss_prefs_types',
        model: 'PreferenceType',
        key: 'id'
      }
    },
    section_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '1',
      references: {
        // model: 'ttrss_prefs_sections',
        model: 'PreferenceSection',
        key: 'id'
      }
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
    // freezeTableName: true
  });
};
