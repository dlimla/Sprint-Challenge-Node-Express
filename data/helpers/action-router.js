const express = require('express');

const router = express.Router();

const Action = require('./actionModel.js');
const Project = require('./projectModel.js');

router.get('/', async(req,res) =>{
    try {
        const action = await Action.get();
        res.status(200).json(action)
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "ERROR retrieving actions"
        })
    }
})


router.get('/:id', async (req,res) => {
    let { id } = req.params
    try {
        const action = await Action.getById(id);
        if(id) {
            res.status(200).json(action);
        } 
        else {
            res.status(404).json({
                message:"please provide an ID"
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "ERROR in retrieving actions"
        })
    }
})

router.post('/', async(req,res) => {
    let { project_id, notes, description } = req.body;
    try {
        if(project_id && description && notes) {
            const newAction = Action.insert(req.body);
            res.status(200).json(newAction)
        }
        else {
            res.status(500).json({
                message: "error could not add action"
            })
        }
    }
    catch (error) {
        res.status(500).json({
            error: "Unable to add new action"
        })
    }
})


router.delete('/:id', async(req,res)=> {
    let {id } = req.params;
    try {
        const action = await Action.getById(id)
        if(action) {
            await Action.remove(id);
            res.status(200).json(action)
        }
        else {
            res.status(500).json({
                message: "ERROR could not find action"
            })
        }
    }
    catch(error) {
        res.status(500).json({
            error: "Unable to remove action"
        })
    }

})

router.put('/:id', async(req,res)=> {
    let { id } = req.params;
    let { project_id, notes, description } = req.body;
    try {
        const action = await Action.get(id);
        if(action) {
            if(project_id && notes && description) {
                await Action.update(id, req.body);
                res.status(200).json(action)
            }
        }
        else {
            releaseEvents.status(400).json({
                message: "ERROR could not find the action"
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "ERROR could not update the action"
        })
    }
})

router.get('/', async(req.res) => {
    let { id } = req.params;
    try {
        const action = await Action.getProjectActions
    }
})

module.exports = router;