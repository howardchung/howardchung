var express = require('express');
var app = express();
app.listen(3000);
app.use('/public', express.static(__dirname + '/public'));
app.get('/', function(req,res){
    res.sendFile("index.html",{"root": __dirname});
});