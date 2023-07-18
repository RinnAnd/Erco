const fs = require('fs');
const path = require('path');

const MIGRATIONS_DIR = __dirname;
const MIGRATION_FILE_REGEX = /^(?<id>\d+)(_.*)?\.sql$/;

//#region File handling

const getMigrations = async () => {
    const dir = fs.opendirSync(MIGRATIONS_DIR);
    const migrations = [];

    let dirent = null;
    while (dirent = dir.readSync()) {
        if (!dirent.isFile()) {
            continue;
        }

        const match = MIGRATION_FILE_REGEX.exec(dirent.name);
        if (!match) {
            continue;
        }

        migrations.push({
            id: parseInt(match.groups["id"]),
            path: path.join(dir.path, dirent.name),
        });
    }
    dir.closeSync();

    migrations.sort((a, b) => a.id - b.id);
    return migrations;
};

const openMigration = async (migration) => {
    return fs.readFileSync(migration.path, { encoding: 'utf8', flag: 'r' });
};

//#endregion File handling


//#region Database handling

const createMigrationsTableIfNotExists = async (client) => {
    const query = `CREATE TABLE IF NOT EXISTS "__migrations" (id BIGINT PRIMARY KEY);`;
    await client.query(query);
};

const getLastAppliedMigration = async (client) => {
    const query = `SELECT id FROM "__migrations" ORDER BY id DESC LIMIT 1;`;
    const res = await client.query(query);
    return res.rows.length ? res.rows[0].id : 0;
};

const insertMigration = async (client, id) => {
    const query = `INSERT INTO "__migrations" (id) VALUES ($1)`;
    await client.query(query, [id]); 
};

//#endregion Database handling


//#region Public API

const migrate = async (client) => {
    try {
        await createMigrationsTableIfNotExists(client);
        const currentVersion = await getLastAppliedMigration(client);
        const migrations = (await getMigrations()).filter(m => m.id > currentVersion);

        console.log("Current version", currentVersion);
        console.log("Migrations to apply", migrations.map(m => m.id));

        for (const migration of migrations) {
            const content = await openMigration(migration);
            console.log("Applying migration", migration.id);
            console.log(content);
            await client.query(content);
            await insertMigration(client, migration.id);
            console.log("Migration applied", migration.id);
        }

        return true;
    } catch (error) {
        console.error(error.stack);
        return false;
    }
};

module.exports = {
    migrate,
};

//#endregion Public API
