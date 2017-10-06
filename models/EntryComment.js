'use strict';

module.exports = function(sequelize, DataTypes) {

  /**
   * EntryComment
   *
   * A comment on a FeedEntry
   */
  let EntryComment = sequelize.define('EntryComment', {

    //
    // Attributes
    //

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

    tableName: 'ttrss_entry_comments'

  });

  return EntryComment;
};
