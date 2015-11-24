var React = require('react');
var md5 = require('md5');
var CommentForm = require('./commentForm');

var BlogList = React.createClass({

	render: function() {

		var self=this;


		var oneBlog = this.props.data.map(function(blog){

			var commentList = blog.comments.map(function(c){
				if(c.user){
		            var user = c.user.local.email;
		            var GRAVATAR_URL = "http://gravatar.com/avatar";
		        	var hash = md5(user);
	 				var size = 60;
	 				var url = GRAVATAR_URL + "/" + hash + "?s=" + size;
		        } else {
		          	var user = "anonymous";
		          	var url = "./img/blank-gravatar.png";
		        }
				var originDate = c.date;
				var commentDate = originDate.substring(0, 10);
				return (
					<div>
						<div className='row'>
							<div className = "col-sm-2">
						      <div className = "thumbnail">
						         <img src = {url}/>
						      </div>
						    </div>
						    <div className="col-sm-10">
						    	<div className="row">
								    <div className="col-sm-8">
								         <h5>Posted by: {user}</h5>						         
								    </div>
									<p className='col-xs-4'><i>{commentDate}</i></p>
								</div>
								<div className="row">
									<p>{c.body}</p>
								</div>
							</div>
						</div><br/>
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