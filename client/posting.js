var React = require("react");
var BlogPoster = require("./blogposter");

React.render(<BlogPoster url="/api/blogs/"/>, document.getElementById("poster-area"));