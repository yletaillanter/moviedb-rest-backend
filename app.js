var express = require('express');
var app = express();

var responseTime = require('response-time');
var request = require('request');
var redis = require('redis');
var client = redis.createClient();

var API_KEY = "a1c65ce9d24b2d4ed117f413bb94a122"

// if an error occurs, print it to the console
client.on('error', function (err) {
    console.log("Error " + err);
});

app.set('port', (process.env.PORT || 5000));

// set up the response-time middleware
app.use(responseTime());

// Search a movie by name
app.get('/search/movie/:query', function(req, res) {

    request('https://api.themoviedb.org/3/search/movie?api_key=' + API_KEY + '&query=' + req.params.query, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            res.send(body);
        } else {
        	res.send(error);
        }
    });

});

app.listen(app.get('port'), function(){
  console.log('Server listening on port: ', app.get('port'));
});