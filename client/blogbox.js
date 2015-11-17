var React = require("react");
var BlogList = require("./bloglist")

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

module.exports = BlogBox;