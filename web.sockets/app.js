var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

io.sockets.on('connection', function(client) {
  console.log("Client connected...");

  client.on('question', function(question) {
    console.log('Got question: ' + question);
    // Send question back to the originator
    client.emit('question', question);
    // Send question to the other listeners
    client.broadcast.emit('question', question);
  });
});

server.listen(8080);
