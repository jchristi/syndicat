'use strict';

module.exports = function(sequelize, DataTypes) {
  var Version = sequelize.define('Version', {
    schema_version: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    }
  }, {
    tableName: 'ttrss_version'
  });
  return Version;
};
