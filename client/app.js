var React = require("react");
var BlogBox = require("./blogbox")


React.render(<BlogBox url="/api/blogs/"/>, document.getElementById("blog-area"));