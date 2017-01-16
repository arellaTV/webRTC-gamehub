var express = require('express');
var app = express();
var ExpressPeerServer = require('peer').ExpressPeerServer;
var port = process.env.PORT || 9000;

var options = {
    debug: true
}

app.use('/', express.static(`${__dirname}/../public/`));
app.use('/api', ExpressPeerServer(server, options));

var server = app.listen(port, () => console.log(`Listening on port ${port}`));
