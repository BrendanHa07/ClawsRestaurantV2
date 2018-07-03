var express = require('express');
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var nodemailer = require("nodemailer");
var path = require("path");
var exphbs = require("express-handlebars")
var app = express();
const dotenv = require('dotenv')

require('dotenv').config();

var port = process.env.PORT || 3030;

// View engine setup
app.set('views', path.join(__dirname, "views"));
app.engine('handlebars', exphbs({ defaultLayout: "main"}));
app.set('view engine', 'handlebars');



// Static folder
app.use('/public', express.static(path.join(__dirname, 'public')));

app.use(express.static("public"));
app.use(methodOverride("_method"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

var routes = require('./controller/controllers.js')
app.use('/', routes);

app.post('/send', function(req, res) {
//   console.log(req.body.email);
  res.render('contact', { msg: 'Email has been sent!'});

  const output = `
    <p> You have a new inquiry </p>
    <p> Contact Detail </p>
    <ul>
        <li>${req.body.name}</li>
        <li>${req.body.email}</li>
        <li>${req.body.phone_number}</li>
    </ul>
    <h3>Message</h3>
    <p>${req.body.message}</p>
  `
  let transporter = nodemailer.createTransport({
    service : 'gmail',
    secure: false,
    port: 25,
    auth: {
        user: process.env.USER,
        pass: process.env.PASS
    },
    tls: {
        rejectUnauthorized: false
    }
  });
  let HelperOptions = {
      from: req.body.email,
      to: 'clawsrestaurants@gmail.com',
      subject: 'New Online Inquiry',
      html: output
  };
  transporter.sendMail(HelperOptions, (err, info) => {
      if (err) {
          throw err
      } else {
          console.log("The message has been sent")
          console.log(info);
      }
  })

});

app.listen(port, () => console.log("App is listening on port: " + port));
