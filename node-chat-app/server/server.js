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

    // socket.emit('newMessage', { // emit signal to the client
    //     from: 'x',
    //     text: '',
    //     createdAt: 100
    // });

    socket.on('createMessage', (data) => { // listen for data from the client
        console.log('Created message:', data);
        io.emit('newMessage', generateMessage(data.from, data.text));
    });

    socket.on('disconnect', () => {
        console.log('Disconencted...');
    });

});

server.listen(port, () => {
    console.log(`Started on port ${port}...`);
});