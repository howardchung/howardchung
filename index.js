var express = require('express');
var app = express();
var port = process.env.PORT || 5000;
app.listen(port);
app.use('/public', express.static(__dirname + '/public'));
app.get('/', function(req,res){
    res.sendFile("index.html",{"root": __dirname});
});
var seaport = require('seaport');
var server = seaport.createServer();
server.listen(5300);
var ports = seaport.connect('colab-sbx-244.oit.duke.edu', 5300);
ports.register('web', {port:port});
setInterval(function(){
    console.log(ports.query());
},3000);