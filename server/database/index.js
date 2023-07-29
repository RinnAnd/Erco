const pg = require('pg');
const format = require('pg-format');
const { migrate } = require('./migrations');

let config = null;

const execute = async (actions) => {
    const client = new pg.Client(config)
    try {
        await client.connect();
        return await actions(client);
    } catch (error) {
        console.error(error.stack);
        throw error;
    } finally {
        await client.end();
    }
};

const insertDataIntoTable = async (client, data) => {
    const columns = Object.keys(data[0]).map(col => `"${col}"`).join(', ');
    const values = data.map(row => Object.values(row));

    const query = format(`INSERT INTO "Projects" (${columns}) VALUES %L`, values);
    await client.query(query);
};

const selectProjects = async (client) => {
    const query = 'SELECT * FROM "Projects"'
    const res = await client.query(query);
    return res.rows
};

const init = async (conf) => {
    config = conf;
    execute(migrate);
};

const insert = async (data) => {
    try {
        await execute(async (client) => {
            await insertDataIntoTable(client, data);
        });
        return true;
    } catch (error) {
        return false;
    }
};

const select = async () => {
    try {
        return await execute(async (client) => {
            return await selectProjects(client);
        });
    } catch (error) {
        return false;
    }
};

module.exports = {
    init,
    insert,
    select,
};
