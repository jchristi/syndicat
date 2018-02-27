'use strict';

const l               = require('lodash');
const co              = require('co');
const chai            = require('chai');
const chaiAsPromised  = require('chai-as-promised');
const Sequelize       = require('sequelize');
const Promise         = Sequelize.Promise;
const fs              = Promise.promisifyAll(require('fs'));
const loadModels      = require('../models');
const rimraf          = require('rimraf');

chai.use(chaiAsPromised);

global.l = l;
global.co = co;
global.chai = chai;
global.expect = chai.expect;
global.chaiAsPromised = chaiAsPromised;
global.fs = fs;

const namespace = 'syndicat-test-' + process.hrtime().join('');
const base_tmp_dir = '/dev/shm';
const tmpdir = `${base_tmp_dir}/${namespace}`;

var count = 1;

async function openDB(name) {
  return new Sequelize(name, 'username', 'password', {
    host: 'localhost',
    dialect: 'sqlite',
    storage: `${tmpdir}/${name}.db`,
    pool: null /* {
                  max: 1,
                  min: 1,
                  idle: 1
                  }*/,
    // typeValidation: true,
    logging: null, //console.log, // TODO: output to log file
    //benchmark: true,
    define: {
      timestamps: false,
      underscored: true
    },
    operatorsAliases: false
  });
}

/**
 * get a test database
 */
global.getTestDB = async () => {
  let name = 'test' +  count++;
  await fs.copyFileAsync(`${tmpdir}/readonly.db`, `${tmpdir}/${name}.db`);
  let sequelize = await openDB(name);
  await loadModels(sequelize);
  // await sequelize.query('PRAGMA journal_mode=MEMORY');
  // console.log(sequelize);
  return sequelize;
};

/**
 * create a test database for other test databases to copy from
 */
async function getReadOnlyTestDB() {
  await fs.mkdirAsync(tmpdir);
  let sequelize = await openDB('readonly');
  // await sequelize.query('PRAGMA journal_mode=MEMORY');
  await loadModels(sequelize);
  return sequelize;
}

try { // these will error if trying to require('./tests') from cli
  before('Create readonly db', async () => {
    global.readonly = await getReadOnlyTestDB();
  });

  after('Delete test data', () => {
    rimraf(tmpdir, () => {});
  });
} catch(e) {
  // do nothing
}
