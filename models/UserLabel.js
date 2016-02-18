'use strict';

module.exports = function(sequelize, DataTypes) {
  var UserLabel = sequelize.define('UserLabel', {
    label_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    article_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    }
  }, {
    tableName: 'ttrss_user_labels2',
    classMethods: {
      associate: models => {
        models.importModels(['Label','Entry']);
        UserLabel.belongsTo(models.Label, { foreignKey: 'label_id' });
        UserLabel.belongsTo(models.Entry, { foreignKey: 'article_id' });
      }
    }
  });
  return UserLabel;
};
