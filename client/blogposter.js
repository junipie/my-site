var React = require('react');

var Poster = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();
    var title = React.findDOMNode(this.refs.title).value.trim();
    var date = React.findDOMNode(this.refs.date).value.trim();
    var content = React.findDOMNode(this.refs.content).value.trim();
    if (!title) {
      return;
    }
    var data = ({title: title, date: date, content: content});
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: data,
      cache: false,
      success: function(data) {
        console.log('inside success');
        document.location = '/blog.ejs';
      }
    .bind(this),
      error: function(xhr, status, err) {
        console.log('broken url is ' + this.props.url);
        console.error(this.props.url, status, err.toString());
      }
    .bind(this)
    });
  },
  render: function() {
    return (
      <div className="container-fluid">
        <form role="form">
          <legend>Blog Entry</legend>
          <div className="form-group">
            <div className="container-fluid">
              <label>Title:</label>
              <input type="text" className="form-control" ref="title" placeholder="Title"/>
            </div>
            <div className="container-fluid">
              <label>Date:</label>
              <input type="text" className="form-control" ref="date" placeholder="Date"/>
            </div>
            <div className="container-fluid">
              <label>Content:</label>
              <textarea className="form-control" rows="5" ref="content" placeholder="Content"/>
            </div>
          </div>
          <button onClick={this.handleSubmit}type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    );
  }
});

module.exports = Poster;
