var express = require('express');
var router = express.Router();
var request = require('request');

var config = {
   baseUrl: 'http://api.themoviedb.org/3/',
   imageBase: 'http://image.tmdb.org/t/p/w300',
   imageBaseFull: 'http://image.tmdb.org/t/p/original',
   nowPlayingEP: 'movie/now_playing?',
   bpMovies11: 'discover/movie?with_people=287&primary_release_year=2011&sort_by=vote_average.desc',
   api_key: '&api_key=fec8b5ab27b292a68294261bb21b04a5'
};

/* GET home page. */
router.get('/', (req, res, next)=> {
	request.get(config.baseUrl + config.nowPlayingEP + config.api_key, (err, response, movieData)=>{
		movieData = JSON.parse(movieData);
		// res.json(movieData);
		res.render('index', {
			movieData: movieData,
			imageUrl: config.imageBase
		})
	})
  // res.render('index', {movieObj: movieData});
});

router.get('/data', (req, res, next)=> {
	request.get(config.baseUrl + config.nowPlayingEP + config.api_key, (err, response, movieData)=>{
		movieData = JSON.parse(movieData);
		res.json(movieData);		
	})
});

router.get('/search', (req, res, next)=>{
	res.render('search', {});
})

router.post('/searchMovie', (req, res, next)=>{
	var searchString = encodeURI(req.body.movieSearch);
	var queryUrl = config.baseUrl + 'search/movie?' + config.api_key + '&query=' + searchString;
	request.get(queryUrl, (error, response, searchData)=>{
		searchData = JSON.parse(searchData)
		res.render('index', {
			movieData: searchData,
		 	imageUrl: config.imageBase
		 })
	})
})
router.get('/searchMovie', (req, res, next)=>{
	res.send("im a get route");
})

router.get('/bradPitt', (req, res, next)=> {
	request.get(config.baseUrl + config.bpMovies11 + config.api_key, (err, response, movieData)=>{
		movieData = JSON.parse(movieData);
		res.render('index', {
			movieData: movieData,
			imageUrl: config.imageBase
		})
	})
  // res.render('index', {movieObj: movieData});
});

module.exports = router;
