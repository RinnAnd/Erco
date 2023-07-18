const fs = require('fs');
const csv = require('csv-parser');
const path = require('path');
const { insert } = require('../database');

function readCSVFile() {
    const results = [];
    fs.createReadStream(path.join(__dirname, 'data.csv')).pipe(csv()).on('data', data => results.push(data)).on('end', async () => {
        await insert(results);
    })
}

module.exports = {
    readCSVFile
}

