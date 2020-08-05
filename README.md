# mysql2-utils

This module lets you use MySQL database in a standarized way.


## Install

    $ npm install --save mysql2-utils

## Example

```js
// Import logger
const mysqlHelper = require('mysql2-utils');

const dbService = mysqlHelper.startPool({
    host: 'myhost',
    // Other configs.
    // This object is passed directly to mysql2 module
});

// Perform queries
const [rows] = await dbService.query('SELECT 1+1');

// Perform queries without throwing error, but an err object
const [err, rows] = await dbService.queryE('SELECT 1+1');

// Get connection and reuse connection
const connection = await dbService.getConnection();
const [rows] = await connection.query('SELECT 1+1');
connection.release();

// Transactions
const connection = await dbService.getConnection();
await connection.beginTransaction();
const [rows] = await connection.query('SELECT 1+1');
await connection.commit();



// Closing pool
await dbService.endPool();
```
