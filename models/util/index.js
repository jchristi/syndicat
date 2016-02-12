"use strict"

//
// Util functions
//

var util = function(sequelize) {
  this.sequelize = sequelize;
};

/**
 * Convert JavaScript Date object to MySQL DateTime
 * (SQLite uses the same format)
 */
util.prototype.toMySqlDateTime = function(date) {
  if (typeof date !== Date) return null;
  return date.toISOString().slice(0,19).replace('T', ' ');
};

/**
 * Convert JavaScript Date object to PostgreSQL TIMESTAMP
 */
util.prototype.toPgTimestamp = function(date) {
  if (typeof date !== Date) return null;
  return date.getTime();
};

/**
 * Do Date math
 */
util.prototype.nowMinusNumDays = function(days) {
  // TODO: check if days is positive integer
  let date = new Date(date.getTime() - (days * 24 * 60 * 60 * 1000))

  // PostgreSQL driver for sequelize uses TIMESTAMP for DataType.DATE
  if (this.sequelize.options.dialect === 'pgsql')
    return util.toPgTimestamp(date);

  // Assume MySQL or SQLite
  return util.toMySqlDateTime(date);
}

module.exports = util;
