const express = require('express');
const { init } = require('./database');
const router = require('./routes')
require('dotenv').config();
const {
    DB_USER,
    DB_PASSWORD,
    DB_HOST,
    DB_PORT
} = process.env;

const config = {
    database: {
        user: DB_USER,
        database: 'erco',
        password: DB_PASSWORD,
        host: DB_HOST,
        port: DB_PORT,
    }
};

const app = express();
const port = process.env.PORT || 3000

async function main() {
    await init(config.database)
    app.use(router);
    app.listen(port, () => {
        console.log(`Now listening on port ${port}`);
    })
}

main()