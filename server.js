// require all my modules
require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const Bookmark = require('./models/Bookmark');
const cors = require('cors');

// create my variables
const app = express();
const PORT = process.env.PORT || 8080;

//define my database and middleware
app.use(express.json())
app.use((req, res, next) => {
    console.log(req.body)
    next()
})
app.use(cors())

mongoose.connect(process.env.MONGO_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
})
mongoose.connection.once('connected', () => console.log('Connected to Mongo Life is Good'))

app.use('/bookmarks', require('./controllers/bookmarksController'))

app.get('/', (req, res) => {
   res.send(`<h1>Hello World</h1>`)
})

/* TEMP DATA */

const localBookmarks = [
   {
      title: "The Greatest Show on Earth",
      url: "https://www.amazon.com/Greatest-Show-Earth-Evidence-Evolution/dp/1416594795"
   },
   {
      title: "The Sixth Extinction: An Unnatural History",
      url: "https://www.amazon.com/Sixth-Extinction-Unnatural-History/dp/0805092994"
   },
   {
      title: "Caste: The Origins of Our Discontents",
      url: "https://www.amazon.com/Caste-Origins-Discontents-Isabel-Wilkerson/dp/0593230256/ref=msx_wsirn_v1_2?pd_rd_w=EccjV&pf_rd_p=ad02864c-dd1c-47aa-98b9-1e72a1084f6a&pf_rd_r=R6VJQQ7YBQ0HTAFPVJ56&pd_rd_r=c39593a5-9000-4b31-9b0b-4a0794482b95&pd_rd_wg=zE9QC&pd_rd_i=0593230256&psc=1"
   }

]


 
// always add this after the last route
app.listen(PORT, () => console.log('hello i am listening on Port: ', PORT))
