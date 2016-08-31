const mongoose = require('mongoose')

const { Schema } = mongoose;
const async = require('async')

const albumSchema = new mongoose.Schema({
  name: { type: String, required: true },
  images: [{ type: Schema.Types.ObjectId, ref: 'Image' }]
})

albumSchema.statics.sortAlbum = function(field, cb){
    this
      .find({})
      .sort(field)
      .exec((err, albums) => {
        if (err) return cb(err)
        else cb(err, albums);
    })
}
albumSchema.statics.RemoveMiddleware = function(req, res, next){
  let id = req.params.id

  mongoose.model('Album').findById(id, (err, album) =>{
    if (err) return res.status(400).send(err)
    let { images } = album
    if(!images){
      next();
    }
    async.each(images, (image, asynCb) => {
      mongoose.model('Image').findById(image, (err, imgdoc) =>{
        imgdoc.remove();
        asynCb();
      });
    }, (err) => {
      if (err) res.status(400).send(err)
      next();
    });
    next();
  });
};

const Album = mongoose.model('Album', albumSchema);

module.exports = Album;
