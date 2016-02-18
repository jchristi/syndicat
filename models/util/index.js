'use strict';

//
// Util functions
//

var util = function(sql_dialect) {
  if (sql_dialect !== 'mysql' && sql_dialect !== 'pgsql')
    sql_dialect = 'sqlite'
  this.sql_dialect = sql_dialect;
};

/**
 * Convert JavaScript Date object to MySQL DateTime
 * (SQLite uses the same format)
 */
util.prototype.toMySqlDateTime = function(date) {
  if (typeof date !== Date) return date;
  return date.toISOString().slice(0,19).replace('T', ' ');
};

/**
 * Convert JavaScript Date object to PostgreSQL TIMESTAMP
 */
util.prototype.toPgTimestamp = function(date) {
  if (typeof date !== Date) return date;
  return date.getTime();
};

/**
 * Do Date math
 */
util.prototype.nowMinusNumDays = function(days) {
  if (days < 0) days = 0;
  let date = new Date((new Date).getTime() - (days * 24 * 60 * 60 * 1000))

  // PostgreSQL driver for sequelize uses TIMESTAMP for DataType.DATE
  if (this.sql_dialect === 'pgsql')
    return this.toPgTimestamp(date);

  // Assume MySQL or SQLite
  return this.toMySqlDateTime(date);
}

module.exports = util;
