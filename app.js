var express = require('express')
var app = express();
var request = require("request")
app.use(express.static(__dirname + '/public'))
app.set('port', (process.env.PORT || 5000))
app.set('views', __dirname + '/views')
app.set('view engine', 'jade')
app.locals.moment = require('moment')
var data = require('./data.json')

app.listen(app.get('port'), function() {
console.log("Node app is running on port " + app.get('port'))
})

app.get('/', function(req, res) {
    request({url: "http://linkedinresume.herokuapp.com/home/resume?id=isADiQdkje&format=json", json: true}, 
        function (err, resp, body) {
    if (!error && response.statusCode === 200) {
                data.linkedin = body
                app.locals.data = data
    res.render('index', {
        fact: data.facts[Math.floor(Math.random()*data.facts.length)]
    })
    }
})
})
