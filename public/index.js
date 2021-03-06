// Make connection
var socket = io.connect('http://localhost:5000');

// Query DOM
var message = document.getElementById('message'),
      handle = document.getElementById('handle'),
      btn = document.getElementById('send'),
      output = document.getElementById('output'),
      feedback = document.getElementById('feedback');

message.addEventListener('keypress', function(){
    socket.emit('typing', handle.value);
})

// emit event when someone clicks send
btn.addEventListener('click', function(){
    //send message to server via the socket

    // it will emit a message down the socket to the
    // server
    // It takes two parameters:
    // name of message
    // what the actual data will be
    socket.emit('chat', {
        message: message.value,
        handle: handle.value
    })
})

// listen for events on the server
socket.on('chat', function(data){
    feedback.innerHTML=""
    output.innerHTML += '<p><strong>' + data.handle + ': </strong>' + data.message + '</p>';
});

socket.on('typing', function(data){
    feedback.innerHTML = '<p><em>' + data + ' is typing a message...</em></p>';
});