var React = require('react');

var WakaData = React.createClass({
   render: function() {
    var wakaStuff = this.props.data.map(function(waka){
      return(
      <div>
      <p>{waka.name}</p>
      <p>{waka.percent}</p>
    </div>
    );
    })
   }
});

var WakaBox = React.createClass({
  getInitialState: function(){
    return{data: []};
  },
  //Fetch data from our server--------------
  loadWakaData: function(){
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
    this.loadWakaData();
  },
    render: function() {
       return (
            <div>
              <h1>Waka Feed</h1>
                <WakaData data={this.state.data}/>
            </div>
       );
    }
});

module.exports = WakaBox;