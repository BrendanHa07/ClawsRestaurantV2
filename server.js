var express = require('express');
var bodyParser = require("body-parser")
var methodOverride = require("method-override");
var nodemailer = require("nodemailer");
var path = require("path");
var exphbs = require("express-handlebars")
var app = express();

var port = process.env.PORT || 3030;

// View engine setup
app.set('views', path.join(__dirname, "views"));
app.engine('handlebars', exphbs({ defaultLayout: "main"}));
app.set('view engine', 'handlebars');

// Static folder
app.use('/public', express.static(path.join(__dirname, 'public')));

app.use(express.static("public"));
app.use(methodOverride("_method"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

var routes = require('./controller/controllers.js')
app.use('/', routes);


app.listen(port, () => console.log("App is listening on port: " + port));
