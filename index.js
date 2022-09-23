const express = require('express');
const { ClientRequest } = require('http');

const path = require('path');
require('dotenv').config();

// App de Express
const app = express();

// Node Server
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);

require('./sockets/socket');



const publicPath = path.resolve(__dirname, 'public')
app.use(express.static(publicPath));




server.listen(process.env.PORT, ( er) =>{
    if(er)throw new Error(er);

    console.log('Servidor corriendo en puerto!!', process.env.PORT);
});