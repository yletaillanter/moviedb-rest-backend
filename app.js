var express = require('express');
var app = express();

var responseTime = require('response-time');
var request = require('request');
//var redis = require('redis');
//var redisClient = redis.createClient();

var API_KEY = "a1c65ce9d24b2d4ed117f413bb94a122";
var BASE_URL = 'https://api.themoviedb.org/3/';

var movieDb = require('moviedb')(API_KEY)

// if an error occurs, print it to the console
/*redisClient.on('error', function (err) {
    console.log("Error " + err);
});*/

//app.set('port', (process.env.PORT || 5000));
app.listen(app.get('port'), function(){
  console.log('Server listening on port: ', app.get('port'));
});
app.use(responseTime());

// Search a movie by name
app.get('/search/movie/:query', function(req, res) {
    movieDb.searchMovie({query: req.params.query}, function(error, response){
        res.send(response);
    });

/* if (!error && response.statusCode == 200) { */
});

// Get information about a movie
app.get('/movie/:id', function(req, res) {
    movieDb.movieInfo({id: req.params.id}, function(error, response){
        if (!error && response.statusCode == 200) {
            res.send(response);
        } else {
            res.send(error);
        }
    });
});