'use strict';

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ttrss_plugin_af_sort_bayes_categories', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    probability: {
      type: 'DOUBLE',
      allowNull: false,
      defaultValue: '0'
    },
    owner_uid: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        //model: 'ttrss_users',
        model: 'User',
        key: 'id'
      }
    },
    word_count: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    }
  }, {
    tableName: 'ttrss_plugin_af_sort_bayes_categories',
    freezeTableName: true
  });
};
