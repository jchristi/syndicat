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
    }
  });

  return UserLabel;
};
