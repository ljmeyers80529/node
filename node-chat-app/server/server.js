const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const { Users } = require('./utils/users');

const { generateMessage, generateLocationMessage } = require('./utils/message');
const { isRealString } = require('./utils/Validation');

const publicPath = path.join(__dirname, '..//public')
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected.');

    // socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app.'));
    // socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user has joined.'));

    socket.on('join', (params, callback) => {
        if (!isRealString(params.name) || !isRealString(params.room)) {
            return callback('Name and/or room is required.');
        }
        socket.join(params.room);
        users.removeUser(socket.id);
        users.addUser(socket.id, params.name, params.room);

        io.to(params.room).emit('updateUserList', users.getUserList(params.room));
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
        var user = users.removeUser(socket.id);

        if (user) {
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left the room.`));
        }
    });

});

server.listen(port, () => {
    console.log(`Started on port ${port}...`);
});