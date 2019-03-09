const express = require('express');

const router = express.Router();

const Action = require('./actionModel.js');

router.get('/:id', async (req,res) => {
    try {
        const action = await Action.get(req.query);
        res.status(200).json(action);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "ERROR in retrieving actions"
        })
    }
})

module.exports = router;