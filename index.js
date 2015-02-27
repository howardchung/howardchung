var express = require('express');
var app = express();
var port = process.env.PORT || 5000;
app.listen(port);
app.use('/public', express.static(__dirname + '/public'));
app.get('/', function(req,res){
    res.sendFile("index.html",{"root": __dirname});
});
var seaport = require('seaport');
var ports = seaport.connect('colab-sbx-244.oit.duke.edu', 5300);
ports.register('web', {port:port});