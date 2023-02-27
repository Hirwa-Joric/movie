const mongoose = require('mongoose')

const movieSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "name is required"],
        unique: true
    },
    description: {
        type: String,
        required: [true,"Duration is  required"]
    },
    duration: {
        type: Number,
        required: [true,"Duration is required"] 
    },
    rating: {
        type: Number,
        required: true,
        default: 1.0
    },
});

const Movie = mongoose.model('Movie', movieSchema);


module.exports = Movie