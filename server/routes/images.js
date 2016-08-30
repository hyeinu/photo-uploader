const express = require('express');
const router = express.Router();
const Image = require('../models/image')
const Album = require('../models/album')

router.route('/')
  .get((req, res) =>{
    Image.find({}, (err, images) =>{
      res.status(err ? 400: 200).send(err || images);
    })
  })

router.delete('/:id', (req, res) =>{
  Image.findByIdAndRemove(req.params.id, err =>{
    if(err) return res.status(400).send(err)
  })
})

router.post('/:albumId/addPic', upload.single('image'), (req, res) => {
  Image.upload(req.file, (err, image)=>{
    if (err) return res.status(400).send(err)
    Album.findByID(req.params.albumId, (err, album) =>{
      if(err || !album){
        return res.status(400).send(err || 'Album not Found!')
      }
      album.images.push(image._id)
      album.save(err =>{
        res.send()
      })
    })  
  })
})

module.exports = router;
