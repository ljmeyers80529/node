const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const { generateMessage } = require('./utils/message');

const publicPath = path.join(__dirname, '..//public')
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected.');

    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app.'));

    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user has joined.'));

    socket.on('createMessage', (data, callback) => { // listen for data from the client
        console.log('Created message:', data);
        io.emit('newMessage', generateMessage(data.from, data.text));
        callback('This is from the server.')
    });

    socket.on('createLocationMessage', (cords) => {
        io.emit('newMessage', generateMessage('Admin', `${cords.latitude}, ${cords.longitude}`))
    });

    socket.on('disconnect', () => {
        console.log('Disconencted...');
    });

});

server.listen(port, () => {
    console.log(`Started on port ${port}...`);
});