var express = require('express');
var path = require('path');
var http = require('http');
var fs = require('fs');
var bodyParser = require('body-parser');

var passport = require("passport");
var flash = require("connect-flash");
var morgan = require("morgan");
var cookieParser =require("cookie-parser");
var session = require("express-session");


var db = require('./model/db');
var Blog = require('./model/blog');
var app = express();
var mongoose = require('mongoose');
var app = express();
var uriUtil = require('mongodb-uri');

var options = {
  server:  { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
  replset: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } }
};  
var mongodbUri = process.env.MONGOLAB_URI || "mongodb://localhost/blogs";
var mongooseUri = uriUtil.formatMongoose(mongodbUri);

require('./config/passport')(passport);

mongoose.connect(mongooseUri, options);
app.use(express.static('public'));


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(morgan('dev'));
app.use(cookieParser());

// Required for passport
app.use(session({ secret: 'ilovescotchscotchyscotchscotch' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

var port = process.env.PORT || 3000;

var blogRoutes = require('./routes/routes');

app.use(express.static('public'));

require('./routes/userroutes.js')(app, passport);

app.use('/api', blogRoutes);

app.get('/', function(req, res){
    res.readFile('index.html')
});

app.listen(port);
console.log('Magic happens on port ' + port);

