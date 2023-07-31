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

const createProject = async (client, data) => {
    const query = `INSERT INTO "Projects" (
            system_name, 
            location, 
            inverter_brand, 
            panel_brand, 
            panel_power,
            panel_quantity,
            installed_power,
            current_generation, 
            total_generation) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`;
    const values = [
        data.system_name,
        data.location,
        data.inverter_brand,
        data.panel_brand,
        data.panel_quantity,
        data.installed_power,
        data.panel_power,
        data.current_generation,
        data.total_generation,
    ];
    await client.query(query, values);
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

const create = async (data) => {
    try {
        return await execute(async (client) => {
            return await createProject(client, data)
        })
    } catch (error) {
        return false;
    }
}

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
    create,
};
