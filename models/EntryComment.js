"use strict"

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('EntryComment', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
      /*references: {
        model: '',
        key: ''
      }*/
    },
    ref_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        //model: 'ttrss_entries',
        model: 'Entry',
        key: 'id'
      }
    },
    owner_uid: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        //model: 'ttrss_users',
        model: 'User',
        key: 'id'
      }
    },
    private: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: '0'
    },
    date_entered: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    tableName: 'ttrss_entry_comments',
    freezeTableName: true
  });
};
