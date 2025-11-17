const mongoose = require("mongoose");
var mongoURL='mongodb+srv://rkhaled2324_db_user:oHdG39WwqGVATm3g@cluster0.xc4weld.mongodb.net/room_mate_database'

mongoose.connect (mongoURL ,{useunifiedtopology:true, useNewUrlParser:true})

var connection = mongoose.connection
connection.on("error", ()=>{
    console.log ("mongo db connection failed")
})

connection.on ("connected", ()=>{
    console.log ("mongo db connection successful")
})

module.exports = mongoose 