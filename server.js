const mongoose = require('mongoose');
const dotenv = require('dotenv');/// it must come before it is mandatorry
dotenv.config({ path: './config.env' })
const app = require('./app');

console.log(app.get('env'))// this shows environment variable by default thenenvironment variable is set develoopment

console.log(process.env); // this is used to access the environment variable
// CREATE A SERVER



mongoose.connect(process.env.CONN_STR, {
    useNewUrlParser: true
}).then((conn) => {
    // console.log(conn);
    console.log("successfully connected")
}).catch((err) => {
    console.log(err);
})



// const testMovie = new Movie({
//     name: "Inter stela",
//     description: "Action packed movie starting bruce willis in this trilling adventure",
//     duration: 120,
//     rating: 4.5
// });

// testMovie.save().then((doc) => {
//     console.log(doc)
// }).catch((err) => {
//     console.log(err)
// })



const port = process.env.PORT || 3000; // we are using the environment variable of port

app.listen(port, () => {// this creates a server and listens to it
    console.log(`listening on port http://localhost:${port}`);

})

