const fs = require('fs');



let movies = JSON.parse(fs.readFileSync('./data/movies.json', 'utf-8'));// remember to change the json to js object format
// bofore sending the data in the response we have to first format it to j send json format it is on line 20





// we want to export many objects so we have to export then as a property on the export object

exports.getAllmovies = (req,res) => {// bofore sending the data in the response we have to first format it to j send json format down 
    res.status(200).json({// and that is called enveloping this is sending data in in anothe object
        status: 'success',
        count: movies.length,
        data: {
            movies:movies
        }
        })
}

exports.validate = (req, res, next) => {
    if (!req.body.name || !req.body.releaseDate) {
        return res.status(400).json({
                "status": "fail",
            "message": "invalid movie in put"
                
            })
    }
    next();
}


exports.getMovieById =  (req, res) => { // we can also pass more than one parameter
    // you must pass the data in the parameter that is equal to the number of parameters passed 
    //you can make a parameter optional if you want by using the ? after it

    console.log(req.params);// this res.params is an object that stores all the rout parameters as its properties { id: '4' }

    const id = +req.params.id; // to change the specific string of id into an integer we can use the + sign before of * 1 after it

    const movie = movies.find(ls => ls.id === id);// find methid loops into an array and stores each element that it is currently on in the ls where it then checks the curents id and then returns it if the current element's id is equal to then id
    
    if (!movie) {
        return  res.status(404).json({// the return is necessary because it tekes us out of the funcrion if not put there it will continue and run the following code 
            "status": "fail",
            "message": "movie not found on the id of  " + id
        })
    }

    res.status(200).json({
        "status": "success",
        "data": {
            movie: movie
        }
    })
}

exports.uploadMovie = (req, res) => {
    // console.log(req.body);

    const newId = movies[movies.length - 1].id + 1;// because we don't heve to id for the newly created movie we will make it
    console.log(newId);
    const newMovie = Object.assign({ id: newId }, req.body)// so the Object.assign merges  objects where we combine the id object wint the res.body object

    movies.push(newMovie);

    fs.writeFile('./data/movies.json', JSON.stringify(movies), (err) => { // This JSON.stringify changes the js object to json object or data
        res.status(201).json({// the 201 status code means success in creation of resource
            status:'success',
            data: {
                movie: newMovie
            }
        })
    })
}

exports.updateMovie = (req, res) => { 

    const id = +req.params.id;
    const movieToUpdate = movies.find(la => la.id === id);

    if (!movieToUpdate) {
        return res.status(404).json({
            status: 'unable to find movie',
            message: ' the movie witn the id ' + id + 'wa unable to be found'
        })
    }
    const index = movies.indexOf(movieToUpdate);


    Object.assign(movieToUpdate, req.body)

    movies[index] = movieToUpdate;

    fs.writeFile('./data/movies.json', JSON.stringify(movies), (err) =>{
        res.status(200).json({
        status:'success',
        data: {
            movie: movieToUpdate
        }
        })
    })
}
exports.deleteMovie = (req, res) => { 

    const id = +req.params.id;
    const movieToUpdate = movies.find(la => la.id === id);

    if (!movieToUpdate) {
        return res.status(404).json({
            status: 'unable to find movie',
            message: ' the movie witn the id ' + id + 'wa unable to be found'
        })
    }
    const index = movies.indexOf(movieToUpdate);


    Object.assign(movieToUpdate, req.body)

    movies[index] = movieToUpdate;

    fs.writeFile('./data/movies.json', JSON.stringify(movies), (err) =>{
        res.status(200).json({
        status:'success',
        data: {
            movie: movieToUpdate
        }
        })
    })
}

// it is a good practice to change the the route name to route

