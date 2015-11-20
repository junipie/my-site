var React = require('react');

var commentSubmit = React.createClass({



handleSubmit: function(e){
        e.preventDefault();
        var blogId = this.props.blogId
        var comment = React.findDOMNode(this.refs.body).value;
        var data = ({body: comment})
		$.ajax({
	              url: "/api/blogs/" + blogId + "/comment",
	              dataType: 'json',
	              data: data,
	              type:'POST',
	              success: function(response){
	                console.log("posting comment", response)
	                document.location='/blog.html'
	              }.bind(this),
	              error: function(xhr, status, err){
	                console.log("not posting data!")
	                console.error(this.props.url, status, err.toString());
	              }.bind(this)
	    })
	},
	
   render: function() {
       return (
                <div>
	                <h4>Post a Comment</h4>
					<textarea className="form-control" rows="2" ref="body" placeholder="Leave a comment..."/>
					<button onClick={this.handleSubmit} type="submit" className="btn btn-primary">Submit</button>
                </div>
       );
   }
});


module.exports = commentSubmit;
	