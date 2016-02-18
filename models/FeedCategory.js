'use strict';

module.exports = function(sequelize, DataTypes) {
  var FeedCategory = sequelize.define('FeedCategory', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    owner_uid: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    collapsed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: '0'
    },
    order_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    parent_cat: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    view_settings: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    }
  }, {

    //
    // Options
    //

    name: {
      plural: 'FeedCategories',
      singular: 'FeedCategory'
    },
    tableName: 'ttrss_feed_categories',


    //
    // static methods
    //

    classMethods: {

      /**
       * method used to declare all model associations
       * @param {Object} models
       */
      associate: models => {
        models.importModels([ 'User', 'Feed', 'FeedCategory', 'Filter2Rule' ]);
        FeedCategory.belongsTo(models.User, { foreignKey: 'owner_uid' });
        FeedCategory.hasMany(models.Feed, { foreignKey: 'cat_id' });
        FeedCategory.hasMany(models.Filter2Rule, { foreignKey: 'cat_id' });
        FeedCategory.hasMany(models.FeedCategory, {
          foreignKey: 'parent_cat',
          as: 'Children'
        });
        FeedCategory.belongsTo(models.FeedCategory, {
          foreignKey: 'parent_cat',
          as: 'Parent'
        });
      }

    } // end static methods

  });
  return FeedCategory;
};
