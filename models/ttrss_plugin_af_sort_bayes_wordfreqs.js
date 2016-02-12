"use strict"

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ttrss_plugin_af_sort_bayes_wordfreqs', {
    word: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    category_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'ttrss_plugin_af_sort_bayes_categories',
        key: 'id'
      }
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
    count: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    }
  }, {
    tableName: 'ttrss_plugin_af_sort_bayes_wordfreqs',
    freezeTableName: true
  });
};
