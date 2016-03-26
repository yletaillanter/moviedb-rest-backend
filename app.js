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

// if a user visits /api/facebook, return the total number of stars 'facebook'
// has across all it's public repositories on GitHub
app.get('/search/movie/:name', function(req, res) {
	res.send(searchMovieAutocomplete(req.params.name));
});

app.listen(app.get('port'), function(){
  console.log('Server listening on port: ', app.get('port'));
});

// call the GitHub API to fetch information about the user's repositories
function searchMovieAutocomplete(query) {
	/*
	var result = axios.get('https://api.themoviedb.org/3/search/movie', {
		params: {
  		    'api_key': API_KEY,
  		    'query': query
		}
	});
	console.log(result);
	*/
	request
	    .get("https://api.themoviedb.org/3/search/movie?api_key=" + API_KEY + "&query=" + query)
	    .on('error', function(err) {
	    	return err;
	    })
	    .on('success', function(response) {
	    	return response.total_results;
	    });
}