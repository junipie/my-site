var React = require('react');
var md5 = require('md5');

var CommentList = React.createClass({
  render: function() {
    var commentList = this.props.data.map(function(c) {
      if (c.user) {
        var user = c.user.local.email;
        var GRAVATAR_URL = 'http://gravatar.com/avatar';
        var hash = md5(user);
        var size = 60;
        var url = GRAVATAR_URL + '/' + hash + '?s=' + size;
      } else {
        var user = 'anonymous';
        var url = '/img/blank-gravatar.png';
      }
      var originDate = c.date;
      var commentDate = originDate.substring(0, 10);
      return (
        <div>
          <div className = "row">
            <div className = "col-sm-2">
              <div className = "thumbnail">
                <img src = {url}/>
              </div>
            </div>
            <div className = "col-sm-10">
              <div className = "row">
                <div className = "col-sm-8">
                  <h5>Posted by: {user}</h5>
                </div>
                <p className = "col-xs-4"><i>{commentDate}</i></p>
              </div>
              <div className = "row">
                <p>{c.body}</p>
              </div>
            </div>
          </div><br/>
        </div>
        );
    });
    return (
      <div className="post">
        {commentList}
      </div>
    );
  }
});

module.exports = CommentList;
