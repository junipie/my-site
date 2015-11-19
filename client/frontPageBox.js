var React = require('react');

var Github = React.createClass({
   render: function() {
   	var gitStuff = this.props.data.map(function(commit){
   		return(
   		<div>
	   		<span id="react-twitter"/>
			<h4><a href={commit.url}>{commit.repo}</a></h4>
			<p>{commit.type}</p>
			<p>{commit.timestamp}</p>
		</div>
		);
   	})
       return (
                <div>
				<h2>Check me out on GitHub</h2>
				{gitStuff}
                </div>
       );
   }
});

var GitBox = React.createClass({
	getInitialState: function(){
		return{data: []};
	},
	//Fetch data from our server--------------
	loadGitData: function(){
		$.ajax({
			url:this.props.url,
			dataType:"json",
			success: function(data){
				console.log(data)
				this.setState({data: data});
			}.bind(this),
			error: function(err){
				console.log("broken url is " + this.props.url);
			}.bind(this)
		});
	},
	//Mount components------------------
	componentDidMount: function(){
		this.loadGitData();
	},
    render: function() {
       return (
                <div>
                   <Github data={this.state.data}/>
                </div>
       );
    }
});

module.exports = GitBox;