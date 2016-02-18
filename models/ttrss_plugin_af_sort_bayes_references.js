'use strict';

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ttrss_plugin_af_sort_bayes_references', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    document_id: {
      type: DataTypes.STRING,
      allowNull: false
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
    }
  }, {
    tableName: 'ttrss_plugin_af_sort_bayes_references',
    freezeTableName: true
  });
};
