// require all my modules
require('dotenv').config()

const express = require('express');
const mongoose = require('mongoose');
const Bookmark = require('./models/Bookmark');
const cors = require('cors');

// create my variables
const app = express();
const PORT = process.env.PORT || 8800;

//define my database and middleware
app.use(express.json()) // parse out json data onto the body key of the request being sent by client
                        // 
app.use(cors());

app.use((req, res, next) => {
    console.log(req.body)
    next()
})

mongoose.connect(process.env.MONGO_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
})
mongoose.connection.once('connected', () => console.log('Connected to Mongo Life is Good'))

app.use('/bookmarks', require('./controllers/bookmarksController'));

app.get('/', (req, res) => {
   res.send(`<h1>Hello World</h1>`)
})

// always add this after the last route
app.listen(PORT, () => console.log('hello i am listening on Port: ', PORT))
