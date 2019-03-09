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


router.get('/:id', async (req, res) => {
    try {
        const project = await Project.getById(req.params.id);
        if(project) {
            res.status(200).json(project);
        }
        else {
            res.status(404).json({
                message:"User not found"
            })
        }
    } catch(error) {
        console.log(error);
        res.status(500).json({
            message: "ERROR in retrieving that project"
        })
    }
})

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