const { Router } = require('express');
const { select } = require('../database')
const { readCSVFile } = require('../scripts/data');

const router = Router();

router.post('/projects/importCSV', async (req, res) => {
    await readCSVFile()
    res.status(200).json({ status: true })
});

router.get('/projects', async (req, res) => {
    const projects = await select()
    res.status(200).json({ status: true, projects })
})

module.exports = router;