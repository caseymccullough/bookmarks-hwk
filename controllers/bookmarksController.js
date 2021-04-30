const express = require('express');
const router = express.Router();
const Bookmark = require('../models/Bookmark');

// Index
router.get('/', async (req, res) => {
   let filters;
   if(Object.keys(req.query).length > 0){
       filters = {...req.query}
   }
   try {
       if(!filters){
           const foundBookmarks = await Bookmark.find({});
           res.status(200).json(foundBookmarks)
       } else {
           const foundBookmarks = await Bookmark.find({...filters});
           res.status(200).json(foundBookmarks)
       }  
   }catch(error){
       res.status(400).json({
           msg: error.message
       })
   }
})

router.get('/:id', (req, res) => {
   const id = parseInt(req.params.id)
   const foundBookmarks = localBookmarks;
   if (id !== id){
      res.status(404).json({
          msg: 'Dude what are you doin'
      }) 
   } else if (id >= foundBookmarks.length || id < 0) {
       res.status(404).json({
           msg: 'The value is out of bounds'
       }) 
   } else {
       res.status(200).json(foundBookmarks[id])
   }
})

// New <----- dont need this

// Delete 
router.delete('/:id', async (req, res) => {
   try {
       const deletedBookmark = await Bookmark.findByIdAndDelete(req.params.id);
       res.status(200).json(deletedBookmark);
   } catch (error) {
       res.status(400).json({
           msg: error.message
       })
   }
})

// Update 
router.put('/:id', async (req, res) => {
   try {
       const updatedBookmark = await Bookmark.findByIdAndUpdate(req.params.id, req.body, { new: true } )
       res.status(200).json(updatedBookmark);
   } catch (error) {
       res.status(400).json({
           msg: error.message
       })
   }
})

// Create

router.post('/', async (req, res) => {
   try{
      const createdBookmark = await Bookmark.create(req.body);
      res.status(200).json(createdBookmark)
   } catch(err){
      res.status(400).json({
         msg: err.message
      })
   }
})

// Edit <------- dont need this

// Show
router.get('/:id', async (req, res) => {
   try {
       const foundBookmark = await Bookmark.findById(req.params.id);
       res.status(200).json(foundBookmark)
   } catch (error) {
       res.status(400).json({
           msg: error.message
       })
   }
})

router.get('/byName/:name/', async (req, res) => {
   try {
       const foundBookmark = await Bookmark.findOne({ name: req.params.name });
       res.status(200).json(foundBookmark)
   } catch (error) {
       res.status(400).json({
           msg: error.message
       })
   }
})


module.exports = router;