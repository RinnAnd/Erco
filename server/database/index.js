const pg = require('pg');
const format = require('pg-format');
let config = null;

const createTableIfNotExists = async (client) => {
    const query = `CREATE TABLE IF NOT EXISTS "Projects" (
        system_id INT PRIMARY KEY,
        system_name TEXT,
        location TEXT,
        inverter_brand TEXT,
        panel_brand TEXT,
        panel_power INT,
        panel_quantity INT,
        installed_power INT,
        current_generation INT,
        total_generation INT
    );`;
    await client.query(query);
}

const insertDataIntoTable = async (client, data) => {
    const columns = Object.keys(data[0]).map(col => `"${col}"`).join(', ');
    const values = data.map(row => Object.values(row));

    const query = format(`INSERT INTO "Projects" (${columns}) VALUES %L`, values);
    await client.query(query);
}

const selectProjects = async (client) => {
    const query = 'SELECT * FROM "Projects"'
    const res = await client.query(query);
    console.log(res);
    return res.rows
}

const init = async (conf) => {
    config = conf
}

const insert = async (data) => {
    const client = new pg.Client(config)
    try {
        await client.connect();
        await createTableIfNotExists(client);
        await insertDataIntoTable(client, data);
        return true;
    } catch (error) {
        console.error(error.stack);
        return false;
    } finally {
        await client.end();
    }
}

const select = async () => {
    const client = new pg.Client(config)
    try {
        await client.connect();
        return await selectProjects(client)
    } catch (error) {
        console.error(error.stack);
        return false;
    } finally {
        await client.end();
    }
}

module.exports = {
    init,
    insert,
    select,
}