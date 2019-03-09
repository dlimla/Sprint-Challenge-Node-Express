const express = require('express');

const router = express.Router();

const Project = require('./projectModel.js');

router.get('/', async (req,res) => {
    try {
        const project = await Project.get(req.query);
        res.status(200).json(project);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "ERROR in retrieving projects"
        });
    }
});

router.post('/', async (req,res) => {
    try {
        const project = await Project.insert(req.body);
        res.status(200).json(project)
    }
    catch(error) {
        console.log(error);
        res.status(500).json({
            messsage: "Error adding in project"
        });
    }
});

module.exports = router;