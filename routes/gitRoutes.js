var express = require('express');
var bodyParser = require('body-parser');
var axios = require('axios');

var url = 'https://api.github.com/users/junipie/events';

fetchGitHubEvents = function(req, res){
axios.get(url)
  .then(function (response) {
	  	var myEvents = response.data.map(function(g){
		    return {
		        'id': g.id, 'type': g.type,
		        'repo': g.repo.name, 'timestamp': g.created_at,
		        'url': g.repo.url
		    };
		});
	res.json(myEvents);
  })
  .catch(function (response) {
    console.log(response);
  });
}

module.exports = fetchGitHubEvents;