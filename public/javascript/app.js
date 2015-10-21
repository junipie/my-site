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

var BlogBox = React.createClass({
	//Set initial state-----------------
	getInitialState: function(){
		return{data: []};
	},
	//Fetch data from our server--------------
	loadBlogsFromServer: function(){
		$.ajax({
			url:this.props.url,
			dataType:"json",
			cache: false,
			success: function(data){
				console.log("inside success")
				this.setState({data: data});
			}.bind(this),
			error: function(xhr, status, err){
				console.log("broken url is " + this.props.url);
				console.error(this.props.url, status, err.toString());
			}.bind(this)
		});
	},
	//Mount components------------------
	componentDidMount: function(){
		this.loadBlogsFromServer();
	},
	render: function() {
		return (
			<div id="blog-posts" className="clearfix blogs-area">
				<BlogList data={this.state.data}/>
			</div>
		);
	}
});

React.render(<BlogBox url="/api/blogs/"/>, document.getElementById("blog-area"));