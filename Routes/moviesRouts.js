const express = require('express');
 const moviesController = require('../controllers/moviesController')

const router = express.Router() // this method will return a router that is a middle ware and we have to use it 
 //a router is a module that helps in the management of incoming requests from the client to the server. 
 //It acts as a middleware that directs the incoming requests to the appropriate handler functions or controllers, based on the request URL and HTTP method.
// this help us move them in separate file

    
    // it receives req,res,next and because it is a param middle ware it also receivers a value parameter
    //this is seting a middlewere that will run we have the id in the route
// router.param('id', (req, vlres, next, value) => { // the params middlewere is a special parameter which runs for a specific rout parameters
//     console.log("movie ID is " + value)
//     next();
// })


    router.route("/")// for more information visit above app.use
    .get(moviesController.getAllmovies)
    .post(moviesController.uploadMovie)// this is called chaining middle ware
    .put(moviesController.putMovies)

router.route("/:id")// for more information visit above app.use
    .get(moviesController.getMovieById)
    .patch(moviesController.updateMovie)
    .delete(moviesController.deleteMovie)

// when you use the middleware it is applied to all the request and to specify the specific route you have to add a nother parameter before the middleware
// you have to add the path of

module.exports = router;