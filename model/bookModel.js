const mongoose = require ('mongoose')


//yes ley hamroo table maa waa collection maa k k colum hunu parxaa vanney kuraa graxaa
const bookSchema = new mongoose.Schema({
bookName: {
    type: String,
    unique : true
},
bookPrice:{
    type: Number
},
isbnNumber : {
    type: Number
},
authorName : {
    type: String
},
publishedAt :{
    type: String
},
    publication: {
        type: String
    }
})

const Book = mongoose.model('Book',bookSchema)
module.exports = Book
