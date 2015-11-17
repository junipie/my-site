var React = require("react");

var BlogList = React.createClass({
	render: function() {
		var oneBlog = this.props.data.map(function(blog){
			return 	(<div>
					<div className='entry-meta'><div className='date'> {blog.date} </div></div>
					<div className='main'><h2 className='entry-title'> {blog.title} </h2>
					<div className='entry-content'> {blog.content} </div></div>
					</div>)
		});
		return (
			<div className='post'>
				{oneBlog}
			</div>
			);
	}
});

module.exports = BlogList;