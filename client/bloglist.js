var React = require('react');
var CommentSubmit = require('./commentForm');
var CommentList = require('./commentList');

var BlogList = React.createClass({
  propTypes: {
    showComments: React.PropTypes.bool,
    blogData: React.PropTypes.array,
  },
  getInitialState: function() {
    return {showComments: false};
  },
  toggleComments: function() {
    this.setState({
      showComments: !this.state.showComments
    });
  },
  render: function() {
    var self = this;
    var blogData = this.props.data;
    var oneBlog = blogData.map(function(blog) {
      return (
        <div>
          <div className="entry-meta">
            <div className="date">
              {blog.date}
            </div>
          </div>
          <div className="main">
            <h2 className="entry-title">
              {blog.title}
            </h2>
            <div className="entry-content">
              {blog.content}
            </div>
            <p><i>#tags, tags, tags</i></p>
            <h4 onClick={self.toggleComments}>Comments  <i className="fa fa-caret-down fa-lg direction-arrows"></i></h4>
            <div className={self.state.showComments ? "" : "hidden"}>
              <CommentSubmit blogId={blog._id} onPost={self.props.newData}/>
              <CommentList data={blog.comments}/>
            </div>
          </div>
        </div>
      );
    });
    return (
      <div className="post">
        {oneBlog}
      </div>
    );
  }
});

module.exports = BlogList;
