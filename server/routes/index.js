const { Router } = require('express');
const { select, insert } = require('../database')
const { readFile } = require('../csv');

const router = Router();

router.post('/projects/importCSV', async (req, res) => {
    const data = await readFile("data.csv");
    const status = await insert(data);
    res.status(200).json({ status });
});

router.get('/projects', async (req, res) => {
    const projects = await select();
    res.status(200).json({ status: true, projects });
})

module.exports = router;