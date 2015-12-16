var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));

router.use(function(req, res, next) {
  console.log('Something is happening.');
  next();
});

router.route('/blogs')
  .post(function(req, res) {
    var title = req.body.title;
    var date = req.body.date;
    var content = req.body.content;
    mongoose.model('Blog').create({
      title: title,
      date: date,
      content: content
    }, function(err, blog) {
      if (err) {
        res.send('Do you require assistance?');
      } else {
        res.send(blog);
      }
    });
  })

  .get(function(req, res) {
    mongoose.model('Blog').find({})
    .populate({ path: 'comments', populate: { path: 'user', select: 'local.email'}})
    .exec(function(err, blogs) {
      if (err) {
        return console.log(err);
      } else {
        res.json(blogs);
      }
    });
  });

router.route('/blogs/:blog_id')
    .get(function(req, res) {
      mongoose.model('Blog').findById(req.params.blog_id, function(err, blog) {
        if (err) {
          res.send('Do you require assistance?');
        } else {
          console.log('Get by id is working');
          res.json(blog);
        }
      });
    })

    .put(function(req, res) {
      mongoose.model('Blog').findById(req.params.blog_id, function(err, blog) {
        if (err) {
          res.send(err);
        }
        blog.title = req.body.title;
        blog.date = req.body.date;
        blog.content = req.body.content;
        blog.save(function(err) {
          if (err) {
            res.send(err);
          } else {
            res.json({ message: 'Blog updated!' });
          }
        });
      });
    })

    .delete(function(req, res) {
      mongoose.model('Blog').remove({
        _id: req.params.blog_id
      }, function(err, blog) {
        if (err) {
          res.send(err);
        }
        res.json({ message: 'Successfully deleted' });
      });
    });

router.route('/blogs/:id/comment')
  .post(function(req, res) {
    mongoose.model('Comment').create({
      body: req.body.body,
      user: req.user
    }, function(err, comment) {
      if (err) {
        res.send(err);
      }
      mongoose.model('Blog').findById({
        _id: req.params.id
      }, function(err, blog) {
        if (err) {
          res.send(err);
        }
        blog.comments.push(comment._id);
        blog.save();
        res.send(comment);
      });
    });
  });

router.route('/blogs/:id/comments')
  .get(function(req, res) {
    mongoose.model('Blog').findById({_id: req.params.id})
    .populate({ path: 'comments', populate: {path: 'user', select: 'local.email'}})
    .exec(function(err, comments) {
      if (err) {
        res.send(err);
      }
      res.send(comments);
    });
  });

module.exports = router;
