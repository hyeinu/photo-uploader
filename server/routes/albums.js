const express = require('express');
const router = express.Router();
const Album = require('../models/album')

router.route('/')
  .get((req, res) =>{
    Album.find({}, (err, albums) =>{
      res.status(err ? 400: 200).send(err || albums);
    }).populate('images')
  })
  .post((req, res) =>{
    Album.create(req.body, (err, album) =>{
      res.status(err ? 400: 200).send(err || album);
    })
  })

router.delete('/:id', (req, res) =>{
  Album.findByIdAndRemove(req.params.id, err =>{
    if(err) return res.status(400).send(err)
    Album.find({}, (err, albums) =>{
      res.status(err ? 400: 200).send(err || albums);
    })
  })
})

module.exports = router;
