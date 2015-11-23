var React = require('react');
var CommentForm = require('./commentForm');

var BlogList = React.createClass({

	render: function() {

		var self=this;

		var oneBlog = this.props.data.map(function(blog){
			var commentList = blog.comments.map(function(c){
				var originDate = c.date;
				var commentDate = originDate.substring(0, 10);
				return (
					<div>
						<div className='row'>
							<h5 className='col-xs-8'>Name</h5>
							<p className='col-xs-4'><i>{commentDate}</i></p>
						</div>
							<p>{c.body}</p>
					</div>
					)
			})
			return (
					<div>
						<div className='entry-meta'>
							<div className='date'>
							{blog.date}
							</div>
						</div>
						<div className='main'>
							<h2 className='entry-title'>
							{blog.title}
							</h2>
							<div className='entry-content'>
							{blog.content}
							</div>
							<p><i>#tags, tags, tags</i></p>
							<h4>Comments</h4>
							{commentList}
							<CommentForm blogId={blog._id} onPost={self.props.newData}/>
						</div>
					</div>
					)
		});
		return (
			<div className='post'>
				{oneBlog}
			</div>
			);
	}
});

module.exports = BlogList;