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
    var li = jQuery('<li></li>');
    li.text(`${msg.from}: ${msg.text}`);
    jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function(msg) {
    var li = jQuery('<li></li>');
    var a = jQuery('<a target="_blank">My current location</a>');

    li.text(`${msg.from}: `);
    a.attr('href', msg.url);

    li.append(a);
    jQuery('#messages').append(li);
});

// socket.emit('createMessage', {
//     from: 'Me80529',
//     text: 'Testing ACK'
// }, function(data) {
//     console.log('ACK!', data);
// });

jQuery('#message-form').on('submit', function(e) {
    e.preventDefault();
    var textBoxValue = jQuery('[name=message]');
    socket.emit('createMessage', {
        from: "User",
        text: textBoxValue.val()
    }, function() {
        textBoxValue.val('');
    });
});

var locationButton = jQuery('#sendLocation');
locationButton.on('click', function() {
    if (!navigator.geolocation) {
        return alert('Geolcation not supported.');
    }

    locationButton.attr('disabled', 'disabled').text('Sending location...');
    navigator.geolocation.getCurrentPosition(function(position) {
        locationButton.removeAttr('disabled').text('Send location');
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, function() {
        locationButton.removeAttr('disabled').text('Send location');
        alert('Unable to fetch location.');
    });

});