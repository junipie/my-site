var React = require('react');
var Github = require('./github');

var GitBox = React.createClass({
  getInitialState: function() {
    return {
      data: []
    };
  },
  componentDidMount: function() {
    this.loadGitData();
  },
  loadGitData: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      success: function(data) {
        this.setState({ data: data });
      }.bind(this),
      error: function(err) {
        console.log(err);
      }.bind(this)
    });
  },
  render: function() {
    return (
      <div className="row">
        <Github data={this.state.data}/>
      </div>
    );
  }
});

module.exports = GitBox;
