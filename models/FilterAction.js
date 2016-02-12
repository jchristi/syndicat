"use strict"

module.exports = function(sequelize, DataTypes) {

  /**
   * Filter Action
   *
   * Enumeration of the following values: 
   *  filter, catchup, mark, tag, publish, score, label, stop, plugin
   */
  var FilterAction = sequelize.define('FilterAction', {
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
    tableName: 'ttrss_filter_actions',
    freezeTableName: true
  });

 return FilterAction;
};
