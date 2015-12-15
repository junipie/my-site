var React = require("react");
var GitBox = require("./gitData");
var WakaBox = require("./wakaBox");

React.render(<GitBox url="/api/github"/>, document.getElementById('githubBox'));
React.render(<WakaBox/>, document.getElementById('wakaBox'));
