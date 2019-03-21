const express = require('express');
const logger = require('morgan');
const helmet = require('helmet');

const actionRouter = require('./data/helpers/action-router.js');
const projectRouter = require('./data/helpers/project-router.js');

const server = express();
const parser = express.json();
const logMiddleware = logger('dev');
const securityMiddleware = helmet();

server.use(parser, logMiddleware, securityMiddleware);

server.use('/api/action', actionRouter);
server.use('/api/project', projectRouter);

server.get('/', (req, res) => {
    res.send('<h2>Lambda Sprint Node</h2>')
});

server.use((err, req, res, next) => {
  res.status(400).json({
    message: "error thrown in server",
    err: err
  })
})

module.exports = server;
