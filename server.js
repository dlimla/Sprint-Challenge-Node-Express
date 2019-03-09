const express = require('express');
const logger = require('morgan');
const helmet = require('helmet');

const actionRouter = require('./data/helpers/actionModel.js');
const projectRouter = require('./data/helpers/projectModel.js');

const server = express();
const parser = express.json();
const logMiddleware = logger('dev');
const secruityMiddleware = helmet();

server.use(parser, logMiddleware, secruityMiddleware);

server.use('/api/action', actionRouter);
server.use('/api/project', projectRouter);

server.get('/', (req, res) => {
    res.send(`
    <h2>Lambda Sprint Node Challenge</h2>
    `);
})

server.use((err, req, res, next) => {
    res.status(400).json({
        message:"ERROR thrown in server",
        err: err
    })
})

module.exports = server;