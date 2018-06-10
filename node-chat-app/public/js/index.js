var socket = io();

socket.on('connect', function() {
    console.log('Connected to server.')

    // socket.emit('createMessage', { // emit signal to the server
    //     from: 'xxxx',
    //     text: 'xxxxx'
    // });
});

socket.on('disconnect', function() {
    console.log('Disconnected from server');
});

socket.on('newMessage', function(msg) { // listen for data from server
    console.log('New Message', msg);
});

socket.emit('createMessage', {
    from: 'Me80529',
    text: 'Testing ACK'
}, function(data) {
    console.log('ACK!', data);
});