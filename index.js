var express = require('express')
var app = express();
var request = require('request')
var async = require('async')
app.use(express.static(__dirname + '/public'))
var port = process.env.PORT || 3000
app.set('views', __dirname + '/views')
app.set('view engine', 'jade')
app.listen(port, function() {
    console.log("Node app is running on port " + port)
})
app.get('/', function(req, res) {
    var data = require("./data.json")
    getData(data.linkedin, function(err, result){
        res.render('index', {
            data: data,
            linkedin: result
        })
    })
})

function getData(url, cb) {
    request({
        url: url
    }, function(err, res, body) {
        if(err || res.statusCode != 200) {
            cb(err || "response code != 200")
        } else {
            cb(null, JSON.parse(body))
        }
    })
}