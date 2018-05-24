var express = require('express');
var bodyParser = require("body-parser")
var methodOverride = require("method-override");
var app = express();

var port = process.env.PORT || 3000;

app.use(express.static("public"));
app.use(methodOverride("_method"));
app.use(bodyParser.urlencoded({ extended: false }));

// viewed at http://localhost:8080
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.listen(port);
console.log("App is listening on port: " + port);