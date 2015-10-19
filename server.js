var path = require('path');
var http = require('http');
var fs = require('fs');
var express    = require('express');
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');
var Blog     = require('./model/blog');
var app = express();
mongoose.connect('mongodb://localhost/blogs');

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 3000;

var router = express.Router();
router.use(function(req, res, next) {
    console.log('Something is happening.');
    next();
})

app.get('/', function(req, res){
    res.readFile('index.html')
});

// ----------------------------------------------------
router.route('/blogs')

    .post(function(req, res) {
        
        var blog = new Blog();
        blog.title = req.body.title;
        blog.date = req.body.date;
        blog.content = req.body.content;

        blog.save(function(err) {
            if (err)
                res.send(err);
            res.redirect("/blog.html");
            // res.send(blog);
            // res.json({ message: 'Blog created!' });
        });
        
    })

// get all the blogs (accessed at GET http://localhost:8080/api/blogs)
    .get(function(req, res) {
        Blog.find(function(err, blog) {
            if (err)
                res.send(err);

            res.json(blog);
        });
    })

router.route('/blogs/:blog_id')

    .get(function(req, res) {
        Blog.findById(req.params.blog_id, function(err, blog) {
            if (err)
                res.send(err);
            res.json(blog);
        });
    })

    .put(function(req, res) {

        Blog.findById(req.params.blog_id, function(err, blog) {

            if (err)
                res.send(err);

            blog.title = req.body.title;
        	blog.date = req.body.date;
        	blog.content = req.body.content;

            blog.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'Blog updated!' });
            });
    	});
    })
    .delete(function(req, res) {
        Blog.remove({
            _id: req.params.blog_id
        }, function(err, blog) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
    });

app.use('/api', router);

app.listen(port);
console.log('Magic happens on port ' + port);

// var db = require('./model/db');
// var blogModel = require('./model/blog');
// app.listen(3000);