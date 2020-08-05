'use strict';

/**
 * Class with different methods for database connection.
 * 
 * @class
 */
module.exports = class DBObject {
    /**
     * DBObject contructor.
     * 
     * @constructor
     */
    constructor(connection) {
        this.connection = connection;
    }
    
    /**
     * Executes a query with a connection to MySQL.
     * 
     * @function
     * @param {String} query - The MySQL query.
     * @param {Array} values - Values to replace on the query.
     * @param {Integer} [timeout] - A timeout can be set if the default timeout is too large.
     */
    query(query, values, timeout = 45000) {
        if (!query) {
            throw new Error('Missing query');
        }

        if (!values) {
            values = [];
        }

        return this.connection.query({
            sql: query,
            timeout,
            values
        });
    }

    /**
     * Release the MySQL connection.
     * 
     * @function
     */
    release() {
        /* This is executed inside of a try-catch because if the connection was released, throws an error. */
        try {
            this.connection.release();
        } catch (err) {
            // logger.error('There was an attempt to release an connection already released.');
        }
    }

    /**
     * Starts a transaction on the connection. The transaction needs to be commited or make a rollback in the end.
     * 
     * @function
     */
    beginTransaction() {
        return this.connection.beginTransaction();
    }

    /**
     * Makes a rollback of the current transaction.
     * 
     * @function
     * @param {Function} callback 
     */
    rollback() {
        return this.connection.rollback();
    }

    /**
     * Commits the current transaction.
     * 
     * @function
     * @param {Function} callback 
     */
    async commit() {
        const self = this;
        try {
            await self.connection.commit();
        } catch (err) {
            await self.connection.rollback();
            throw err;
        }
    }
};