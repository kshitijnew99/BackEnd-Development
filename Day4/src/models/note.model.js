const mongoose = require("mongoose")


/*
Schema - structure of the data  
*/


const noteSchema = new mongoose.Schema({
    title:String,
    content:String
})

/*
Collection - group of similar kind of data  
model - make easy to perform CRUD operation on collection
*/

const noteModel = mongoose.model("note",noteSchema)

module.exports = noteModel

