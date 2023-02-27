const Movie = require("../models/movieModel")




exports.getAllmovies = async (req, res) => {
    try {
        const movies = await Movie.find()

        res.status(200).json({
            status:'success',
            data: {
                movies
            }
        })
    } catch (error) {

    }
    
}

exports.getMovieById = async (req, res) => { 

    try {
            const movie = await Movie.findById(req.params.id);
        res.status(200).json({
            status:'success',
            data: {
                movie
            }
        })
    } catch (err) {
        res.status(404).json({
        status: 'fail',
        message: err.message
    })
    }
    
    // const movie = await Movie.findById({ _id: req.params.id })


}

exports.uploadMovie = async (req, res) => {

    // const testMovie = new Movie({});
    // testMovie.save();

    try {
        const movie = await Movie.create(req.body)

        res.status(201).json({
            status: 'success',
            length:movie.length,
            data: {
                movie
            }
        })
    } catch (err) {
        res.status(404).json({
        status: 'fail',
        message: err.message
    })
    }

    


}

exports.updateMovie = async (req, res) => { 
    try {
    const id = req.params.id;
        const updateMovie = req.body;
    
        const movie = await Movie.findByIdAndUpdate(id, updateMovie, { new: true });
        res.status(200).json({
            status:'success',
            data: {
                movie
            }
        })
    } catch (error) {
        res.status(404).json({
            status: 'fail',
            message: error.message
        })
    }


    

}
exports.deleteMovie = async (req, res) => { 
    try {
        const id = req.params.id;

        const movie = await Movie.findByIdAndDelete(id);
        res.status(200).json({
            status:'success',
            data: {
                movie
            }
        })
    } catch (error) {
        res.status(404).json({
            status: 'fail',
            message: error.message
        })
    }
}
exports.putMovies = async (req, res) => {
    try {
        const movieId = req.params.id;
        const movieToUpdate = await Movie.findById(movieId);

        if (!movieToUpdate) {
            res.status(404).json({
                status: 'fail',
                message: 'Movie not found'
            })
        }
        movieToUpdate.name = req.body.name;
        movieToUpdate.description = req.body.description;
        movieToUpdate.duration = req.body.duration;
        movieToUpdate.rating = req.body.rating;

        await movieToUpdate.save();
        res.status(200).json({
            status:'success',
            data: {
                movieToUpdate
            }
        })
    } catch (error) {
        res.status(404).json({
            status: 'fail',
            message: error.message
        })
    }
}
// it is a good practice to change the the route name to route

