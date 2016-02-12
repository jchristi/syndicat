"use strict"

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Entry', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    guid: {
      type: DataTypes.STRING,
      allowNull: false
    },
    link: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    updated: {
      type: DataTypes.DATE,
      allowNull: false
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    content_hash: {
      type: DataTypes.STRING,
      allowNull: false
    },
    cached_content: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    no_orig_date: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: '0'
    },
    date_entered: {
      type: DataTypes.DATE,
      allowNull: false
    },
    date_updated: {
      type: DataTypes.DATE,
      allowNull: false
    },
    num_comments: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    plugin_data: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    comments: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    lang: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'ttrss_entries',
    freezeTableName: true
  });
};
