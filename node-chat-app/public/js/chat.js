var socket = io();

function scrollToBottom() {
    // selectors
    var messages = jQuery('#messages');
    var newMessage = messages.children('li:last-child');
    // heights
    var clientHeight = messages.prop('clientHeight'); // properties.
    var scrollTop = messages.prop('scrollTop');
    var scrollHeight = messages.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMesssageHeight = newMessage.prev().innerHeight();

    if (clientHeight + scrollTop + newMessageHeight + lastMesssageHeight >= scrollHeight) {
        messages.scrollTop(scrollHeight);
    }
}

socket.on('connect', function() {
    var params = jQuery.deparam(window.location.search);

    socket.emit('join', params, function(err) {
        if (err) {
            alert(err);
            window.location.href = '/'; // redirect back to a specific page.
        } else {
            console.log('No error.');
        }
    });
});

socket.on('disconnect', function() {
    console.log('Disconnected from server');
});

socket.on('updateUserList', function(users) {
    var ol = jQuery('<ol></ol>');

    users.forEach(function(user) {
        ol.append(jQuery('<li></li>').text(user));
    });
    jQuery('#users').html(ol);
});

socket.on('newMessage', function(msg) { // listen for data from server
    var fmtTime = moment(msg.createdAt).format('H:mm a');
    var template = jQuery("#messageTemplate").html();
    var html = Mustache.render(template, {
        text: msg.text,
        from: msg.from,
        createdAt: fmtTime
    });
    jQuery('#messages').append(html);
    scrollToBottom();
});

socket.on('newLocationMessage', function(msg) {
    var fmtTime = moment(msg.createdAt).format('H:mm a');
    var template = jQuery("#locationMessageTemplate").html();
    var html = Mustache.render(template, {
        url: msg.url,
        from: msg.from,
        createdAt: fmtTime
    });
    jQuery('#messages').append(html);
    scrollToBottom();
});

jQuery('#message-form').on('submit', function(e) {
    e.preventDefault();
    var textBoxValue = jQuery('[name=message]');
    socket.emit('createMessage', {
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