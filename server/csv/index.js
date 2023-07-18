const fs = require('fs');
const csv = require('csv-parser');

const readFile = async (filePath) => {
    return await new Promise(resolve => {
        const results = [];
        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', data => results.push(data))
            .on('end', () => resolve(results));
    });
}

module.exports = {
    readFile,
}
