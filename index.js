const mongoose = require('mongoose');

const ConnectionString = "mongodb+srv://admin:admin@basicmern.uu9uuzj.mongodb.net/?retryWrites=true&w=majority&appName=BasicMern";

async function connectToDatabase(){
    await mongoose.connect(ConnectionString);
    console.log("connected to database successfully");
}
module.exports = connectToDatabase