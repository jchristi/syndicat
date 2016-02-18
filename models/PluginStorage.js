'use strict';

module.exports = function(sequelize, DataTypes) {
  var PluginStorage = sequelize.define('PluginStorage', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    owner_uid: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    tableName: 'ttrss_plugin_storage',
    classMethods: {
      associate: models => {
        models.importModels(['User']);
        PluginStorage.belongsTo(models.User, { foreignKey: 'owner_uid' });
      }
    }
  });
  return PluginStorage;
};
