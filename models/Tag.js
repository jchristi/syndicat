'use strict';

module.exports = function(sequelize, DataTypes) {
  var Tag = sequelize.define('Tag', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    owner_uid: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'ttrss_users',
        // model: 'User',
        key: 'id'
      }
    },
    tag_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    post_int_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'ttrss_user_entries',
        // model: 'UserEntry',
        key: 'int_id'
      }
    }
  }, {
    tableName: 'ttrss_tags',
    classMethods: {
      associate: models => {
        models.importModels(['User','UserEntry']);
        models.Tag.belongsTo(models.User, { foreignKey: 'owner_uid' });
        models.Tag.belongsTo(models.UserEntry, { foreignKey: 'post_int_id' });
      }
    }
  });
  return Tag;
};
