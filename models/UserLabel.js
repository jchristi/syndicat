"use strict"

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('UserLabel', {
    label_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'ttrss_labels2',
        // model: 'Label',
        key: 'id'
      }
    },
    article_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'ttrss_entries',
        // model: 'Entry',
        key: 'id'
      }
    }
  }, {
    tableName: 'ttrss_user_labels2',
    freezeTableName: true
  });
};
