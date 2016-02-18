'use strict';

module.exports = function(sequelize, DataTypes) {

  /**
   * EntryComment
   *
   * A comment on a FeedEntry
   */
  var EntryComment = sequelize.define('EntryComment', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    ref_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    owner_uid: {
      type: DataTypes.INTEGER(11),
      allowNull: false
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

    //
    // Options
    //

    tableName: 'ttrss_entry_comments',


    //
    // static methods
    //

    classMethods: {
      associate: models => {
        models.importModels(['User','Entry']);
        models.EntryComment.belongsTo(models.User, { foreignKey: 'owner_uid' });
        models.EntryComment.belongsTo(models.Entry, { foreignKey: 'ref_id' });
      }
    } // end static methods

  });

  return EntryComment;
};
