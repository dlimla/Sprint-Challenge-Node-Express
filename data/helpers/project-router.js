const express = require('express');

const router = express.Router();

const Project = require('./projectModel.js');
const Action = require('./actionModel.js')

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


router.delete('/:id', async(req,res) => {
    let {id } = req.params;
    try {
        const project = await Project.getById(id)
        if(project) {
            await Project.remove(id);
            res.status(200).json(project)
        }
        else {
            res.status(400).json({
                message: "ERROR could not find the project"
            })
        }
    }
    catch (error){
        res.status(500).json({
            message: "ERROR could not delete the project"
        })
    }
})

router.put('/:id', async (req, res) => {
    try {
        const project = await Project.update(req.params.id, req.body);
        if(project) {
            res.status(200).json(project)
        }
        
        else {
            res.status(404).json({
                message: "The project could not be updated"
            })
        }
    } 
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "ERROR updating the project on server"
        })
    }

})

router.get('/api/projects/:id/actions', (req, res) => {
    const { id } = req.params;
    Project.getProjectActions(id)
      .then(allActions => {
        if (!allActions.length) {
          res.status(404).json({ 
              message: "ERROR The actions of the project with the specified ID does not exist."
            });
        } else {
          res.status(200).json(allActions);
        }
      })
      .catch(err => res.status(500).json({ 
          error: "The actions of the projects could not be retrieved" 
        }));
  });
module.exports = router;