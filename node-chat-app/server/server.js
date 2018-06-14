const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const { generateMessage, generateLocationMessage } = require('./utils/message');
const { isRealString } = require('./utils/Validation');

const publicPath = path.join(__dirname, '..//public')
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected.');

    // socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app.'));
    // socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user has joined.'));

    socket.on('join', (params, callback) => {
        if (!isRealString(params.name) || !isRealString(params.room)) {
            callback('Name and/or room is required.');
        }
        socket.join(params.room);

        socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app.'));
        socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined.`));

        callback();
    });

    socket.on('createMessage', (data, callback) => { // listen for data from the client
        console.log('Created message:', data);
        io.emit('newMessage', generateMessage(data.from, data.text));
        callback()
    });

    socket.on('createLocationMessage', (cords) => {
        io.emit('newLocationMessage', generateLocationMessage('Admin', cords.latitude, cords.longitude))
    });

    socket.on('disconnect', () => {
        console.log('Disconencted...');
    });

});

server.listen(port, () => {
    console.log(`Started on port ${port}...`);
});