var express = require('express');
var app = express();
var ExpressPeerServer = require('peer').ExpressPeerServer;
var port = process.env.PORT || 9000;

var options = {
    debug: true
}

app.use('/', express.static(`${__dirname}/../public/`));

var server = require('http').createServer(app);

app.use('/peerjs', ExpressPeerServer(server, options));

server.listen(9000);

server.on('connection', function(id) {
  console.log('connected');
});
