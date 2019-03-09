const express = require('express');
const logger = require('morgan');
const helmet = require('helmet');

const actionRouter = require('./data/helpers/actionModel.js');
const projectRouter = require('./data/helpers/projectModel.js');

const server = express();
const parser = express.json();
const logMiddleware = logger('dev');
const securityMiddleware = helmet();

server.use(parser, logMiddleware, securityMiddleware);

server.use('/api/user', actionRouter);
server.use('/api/post', projectRouter);

server.get('/', (req, res) => {
  res.send(`
    <h2>Lambda Blog</h2>
    `);
});

server.use((err, req, res, next) => {
  res.status(400).json({
    message: "error thrown in server",
    err: err
  })
})

module.exports = server;
