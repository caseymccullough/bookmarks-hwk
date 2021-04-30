const {Schema, model} = require('mongoose'); // import only what we need from mongoose

const bookmarkSchema = new Schema({
   title: {type: String, required: true},
   url:{type: String, required: true, unique: true}
})

// create the model itself
const Bookmark = model ('Bookmark', bookmarkSchema)
model.exports = Bookmark;