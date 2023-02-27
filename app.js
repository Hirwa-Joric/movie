//IMPORT A THIED PARTY PACKAGE

const express = require('express')// this will return a function that we can asigh to the  express variable
const app = express();// we are calling the express function and it will return an object and we can  a sign it to the app variable
const morgan = require('morgan')

const moviesRouter = require('./Routes/moviesRouts')

/////////////////////////// MIDDLEWARE FUNCTIONS //////////////////////////

/// MIDDLEWARE ARE JUST A FUNCTION WITH THERE ARGUMENTS
// you can name the varuables any thing you want just tat the forst returns the request the second one returens the response and the third return the next function

const logger = (req, res, next) => {
    console.log("custom middleware called");
    next();// this is a must 
}

//////////////////////////////////////////////////////////////////////////

// the reason why we don't put the () on the logger is because it is already  amiddleware function and we do not have to re call it
// the express.json and the morgain need the () be cause the will return a middle function but they are not middle functions

app.use(express.json());// to use a middleware on the app function we have to use the use function
// app.use(logger)
app.use(morgan('dev'))
app.use(express.static("./public")) // this static method will return us the middleware and we have to pass in the whare we want to serve the static file
app.use((req,res,next) => {
    req.requestedAt = new Date().toISOString();
    next();
})



//ROUT = HTTP METHOD + URL
app.get('/', (req, res) => {
    // res.status(200).send('hello this is from express server')//this is method chained and the status must come before send
    // when using the send methos the content type is set to text/heml
    // if you want to send some json you have to use json
    res.status(200).json({ message: 'hello', status: 200 })
})


//////////////////////////////////////////////////Refactored code /////////////////////////////////


//  GET- api / movies
// if yo find that the end point are the same you can use the route method to link them to gether


// app.get("/api/v1/movies", getAllmovies )
// // Get - api/v1/movies/id
// app.get('/api/v1/movies/:id', getMovieById)
// app.post("/api/v1/movies",uploadMovie )
// app.patch("/api/v1/movies/:id", updateMovie)
// app.delete('/api/v1/movies/:id', deleteMovie)


// you don't need to pass any end poin youjust have to pass the rout handler

///////////////// for the routs find the movesRouts.js
// what this will do it will append the path in the middleware to the one in the app.use so we have to remove the one in the middleware
app.use('/api/v1/movies/',moviesRouter) // we are mounting the middleware to the a specific route ' this is called mounting routes '

// CREATE A SERVER

module.exports = app;
// because we want to  use the app object in the server app 
