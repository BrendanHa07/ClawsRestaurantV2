var express = require('express');
var bodyParser = require("body-parser");
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
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

var routes = require('./controller/controllers.js')
app.use('/', routes);

app.post('/send', function(req, res) {
  console.log(req.body.email);
  res.render('contact', { msg: 'Email has been sent!'});

  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: 'ha.brendan07@gmail.com', // generated ethereal user
        pass: 'Crawfish890!' // generated ethereal password
    }
});

// setup email data with unicode symbols
let mailOptions = {
    from: req.body.email, // sender address
    to: 'ha.brendan07@gmail.com', // list of receivers
    subject: 'New Inquiry', // Subject line
    text: 'Hello world?', // plain text body
    html: '<b>Hello world?</b>' // html body
};

// send mail with defined transport object
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
});
});

app.listen(port, () => console.log("App is listening on port: " + port));
