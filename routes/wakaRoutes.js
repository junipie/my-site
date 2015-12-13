var express = require('express');
var bodyParser = require('body-parser');
var axios = require('axios');
require('dotenv').load();

var url2 = 'https://wakatime.com/api/v1/users/current/stats/last_7_days?api_key=' + process.env.WAKA_KEY;

fetchWakaEvents = function(req, res){
  var wakaArray = [];

  populateWaka = function(w){
    wakaArray.push(w);
  }

  axios.get(url2)
    .then(function (response) {
      if(response){
        populateWaka(response);
      }
      var myWakaEvents = wakaArray.map(function(waka){
        return{"languages": waka.data.data.languages}
        console.log(waka.data.data.languages);
      }) 
      res.json(myWakaEvents);
      console.log(myWakaEvents)
    })

    .catch(function(response){
      console.log(response);
    });
  }

module.exports = fetchWakaEvents;