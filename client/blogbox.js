var React = require('react');
var BlogList = require('./bloglist');

var BlogBox = React.createClass({
  getInitialState: function() {
    return {
      data: []
    };
  },
  componentDidMount: function() {
    this.loadBlogsFromServer();
  },
  loadBlogsFromServer: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        console.log('inside success');
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.log('broken url is ' + this.props.url);
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  render: function() {
    var self = this;

    var doRefresh = function() {
      self.loadBlogsFromServer();
    };
    return (
      <div id="blog-posts" className="clearfix blogs-area">
        <BlogList data={this.state.data} newData={doRefresh}/>
      </div>
    );
  }
});

module.exports = BlogBox;
