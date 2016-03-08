'use strict';

var moment = require('moment');
var sequelize = require('sequelize');

//
// Util functions
//

var util = function(sql_dialect) {
  if (sql_dialect !== 'mysql' && sql_dialect !== 'pgsql')
    sql_dialect = 'sqlite';
  this.sql_dialect = sql_dialect;
};

/**
 *
 */
util.prototype.dateSubtract = function(datetime, amount) {
  switch(this.sql_dialect) {
  case 'pgsql':
    datetime = datetime.toLowerCase() === 'now' ? 'NOW()' : datetime;
    return sequelize.literal(datetime + ' - ' + amount);
  case 'mysql':
    datetime = datetime.toLowerCase() === 'now' ? 'NOW()' : datetime;
    return sequelize.fn('DATE_SUB', datetime, amount);
  default: // sqlite
    return sequelize.fn('date', datetime, sequelize.literal("'-'||" + amount));
  }
};

/**
 *
 */
util.prototype.colToMinutes = function(column) {
  switch(this.sql_dialect) {
  case 'pgsql':
    return 'CAST(' + column + " || ' minutes')";
  case 'mysql':
    return 'INTERVAL CONVERT(`' + column + '` SIGNED INTEGER) MINUTE)';
  default: //sqlite
    return column + "||' minutes'";
  }
};

/**
 * Convert JavaScript Date object to MySQL DateTime
 * (SQLite uses the same format)
 */
util.prototype.toMySqlDateTime = function(date) {
  if (typeof date !== Date) return date;
  // return date.toISOString().slice(0,19).replace('T', ' ');
  return moment(date).format('YYYY-MM-DD HH:mm:ss');
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
util.prototype.daysAgo = function(days) {
  if (days < 0) days = 0;
  // let date = new Date((new Date).getTime() - (days * 24 * 60 * 60 * 1000));
  let date = moment().subtract(days, 'days').toDate();

  // PostgreSQL driver for sequelize uses TIMESTAMP for DataType.DATE
  if (this.sql_dialect === 'pgsql')
    return this.toPgTimestamp(date);

  // Assume MySQL or SQLite
  return this.toMySqlDateTime(date);
};

module.exports = util;
