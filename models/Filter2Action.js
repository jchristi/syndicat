'use strict';

module.exports = function(sequelize, DataTypes) {
  var Filter2Action = sequelize.define('Filter2Action', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    filter_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    action_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '1'
    },
    action_param: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    }
  }, {
    tableName: 'ttrss_filters2_actions',
    classMethods: {
      associate: models => {
        models.importModels(['Filter2','FilterAction']);
        models.Filter2Action.belongsTo(models.Filter2, { foreignKey: 'filter_id' });
        models.Filter2Action.belongsTo(models.FilterAction, { foreignKey: 'action_id' });
      }
    }
  });
  return Filter2Action;
};
