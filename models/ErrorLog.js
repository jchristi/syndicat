"use strict"

module.exports = function(sequelize, DataTypes) {

  var ErrorLog = sequelize.define('ErrorLog', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    owner_uid: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    errno: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    errstr: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    filename: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    lineno: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    context: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {

    //
    // Options
    //

    tableName: 'ttrss_error_log',


    //
    // static methods
    //

    classMethods: {

      /**
       * Associations
       */
      associate: (models) => {
        models.ErrorLog.belongsTo(models.User, { foreignKey: 'owner_uid' });
      },

    } // end static methods

  });

  return ErrorLog;
};
