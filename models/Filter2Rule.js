'use strict';

module.exports = function(sequelize, DataTypes) {
  let Filter2Rule = sequelize.define('Filter2Rule', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    filter_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    reg_exp: {
      type: DataTypes.STRING,
      allowNull: false
    },
    inverse: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: '0'
    },
    filter_type: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    feed_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    cat_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    cat_filter: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: '0'
    }
  }, {
    tableName: 'ttrss_filters2_rules'
  });

  return Filter2Rule;
};
