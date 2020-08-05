'use strict';

const DBConnection = require('./DBConnection');

module.exports = class DBPool {
    constructor(dbPool) {
        this.dbPool = dbPool;
    }

    /**
     * Get a MySQL connection from the pool
     * 
     * @name getConnection
     * @function
     * @param {Function} callback 
     */
    async getConnection () {
        const connection = await this.dbPool.getConnection();
        return new DBConnection(connection);
    }

    /**
     * Executes a query without a previous connection to MySQL.
     * 
     * @name query
     * @function
     * @param {String} query - The MySQL query.
     * @param {Array} values - Values to replace on the query.
     * @param {Integer} [timeout] - A timeout can be set if the default timeout is too large.
     * @param {Boolean} useThrow - Simplifies error handling, if true, it will throw an error, if false, it will return err as object in the array response.
     * 
     */
    async query (query, values, timeout, useThrow = true) {
        let dbConnection;
        try {
            dbConnection = await this.getConnection();
            const queryResult = await dbConnection.query(query, values, timeout);

            dbConnection.release();

            if (!useThrow) queryResult.unshift(undefined);
            
            return queryResult;
        } catch (err) {
            if (dbConnection) {
                dbConnection.release();
            }
            
            if (useThrow) {
                throw err;
            } else {
                return [err];
            }
        }
    }
    /**
     * Executes a query without a previous connection to MySQL without Throw.
     * 
     * @name queryE
     * @function
     * @param {String} query - The MySQL query.
     * @param {Array} values - Values to replace on the query.
     * @param {Integer} [timeout] - A timeout can be set if the default timeout is too large.
     * 
     */
    async queryE (query, values, timeout) {
        return this.query(query, values, timeout, false);
    }

    /**
     * Ends pool
     */
    endPool() {
        return this.dbPool.end();
    }
};