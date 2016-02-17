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
    tableName: 'ttrss_filter_actions',
    classMethods: {
      associate: models => {
        models.importModels(['Filter2Action']);
        models.FilterAction.hasMany(models.Filter2Action, { foreignKey: 'action_id' });
      }
    }
  });

 return FilterAction;
};
