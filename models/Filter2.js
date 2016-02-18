'use strict';

module.exports = function(sequelize, DataTypes) {
  var Filter2 = sequelize.define('Filter2', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    owner_uid: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    match_any_rule: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: '0'
    },
    enabled: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: '1'
    },
    inverse: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: '0'
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    order_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    }
  }, {
    tableName: 'ttrss_filters2',
    classMethods: {
      associate: models => {
        models.importModels(['User','Filter2Action','Filter2Rule']);
        models.Filter2.belongsTo(models.User, { foreignKey: 'owner_uid' });
        models.Filter2.hasMany(models.Filter2Action, { foreignKey: 'filter_id' });
        models.Filter2.hasMany(models.Filter2Rule, { foreignKey: 'filter_id' });
      }
    }
  });
  return Filter2;
};
