'use strict';

module.exports = function(sequelize, DataTypes) {

  /**
   * Access Key
   *
   * Access credentials if a feed requires authentication
   */
  let AccessKey = sequelize.define('AccessKey', {

    //
    // Attributes
    //

    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    // access key for feed authentication
    access_key: {
      type: DataTypes.STRING,
      allowNull: false
    },
    // feed id
    feed_id: {
      type: DataTypes.STRING,
      allowNull: false
    },
    // is category?
    is_cat: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: '0'
    },
    // user id
    owner_uid: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    }

  }, {

    //
    // Options
    //

    tableName: 'ttrss_access_keys'

    /*indexes: [
      {
        name: 'owner_uid',
        method: 'BTREE',
        unique: false,
        fields: ['owner_uid']
      }
    ],*/

  });

  return AccessKey;
};
