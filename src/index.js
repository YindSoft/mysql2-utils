'use strict';

const mysql = require('mysql2/promise');
const DBPool = require('./modules/DBPool');

const startPool = (config) => {
    const dbPool = mysql.createPool(config);
    return new DBPool(dbPool);
};

module.exports = {
    startPool
};