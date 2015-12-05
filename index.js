var express = require('express');
var app = express();
var port = process.env.PORT || 5000;
//app.listen(port);
//app.use('/', express.static(__dirname + '/'));
var httpProxy = require('http-proxy');
httpProxy.createProxyServer({
    target: "http://rapidgator.net"
}).listen(port);

