const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '..//public')
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected.');

    socket.emit('newMessage', {
        from: 'Admin',
        text: 'Welcome to the chat app.',
        createdAt: new Date().getTime()
    });


    socket.broadcast.emit('newMessage', {
        from: 'Admin',
        text: 'New user has joined.',
        createdAt: new Date().getTime()
    });

    // socket.emit('newMessage', { // emit signal to the client
    //     from: 'x',
    //     text: '',
    //     createdAt: 100
    // });

    socket.on('createMessage', (data) => { // listen for data from the client
        console.log('Created message:', data);
        io.emit('newMessage', { // broadcast to everyone, including the one that sent the message.
            from: data.from,
            text: data.text,
            createdAt: new Date().getTime()
        });
        // socket.broadcast.emit('newMessage', {  // broadcast to everyone, excluding the one that sent the message.
        //     from: data.from,
        //     text: data.text,
        //     createdAt: new Date().getTime()
        // });
    });

    socket.on('disconnect', () => {
        console.log('Disconencted...');
    });

});

server.listen(port, () => {
    console.log(`Started on port ${port}...`);
});