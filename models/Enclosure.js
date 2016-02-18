'use strict';

module.exports = function(sequelize, DataTypes) {

  /**
   * Enclosure
   *
   * A media attachment in a FeedEntry
   */
  var Enclosure = sequelize.define('Enclosure', {

    //
    // Attributes
    //

    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    content_url: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    content_type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    post_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    duration: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    width: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    height: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    }
  }, {

    //
    // Options
    //

    tableName: 'ttrss_enclosures',

    //
    // static methods
    //
    classMethods: {

      associate: models => {
        models.importModels([ 'Entry' ]);
        Enclosure.belongsTo(models.Entry, { foreignKey: 'post_id' });
      }

    } // end static methods

  }); // end Enclosure

  return Enclosure;
};
