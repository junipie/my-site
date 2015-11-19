var React = require("react");
var GitBox = require("./frontPageBox")

React.render(<GitBox url="/api/github"/>, document.getElementById('githubBox'));