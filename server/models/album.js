const mongoose = require('mongoose')

const { Schema } = mongoose;

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
const Album = mongoose.model('Album', albumSchema);

module.exports = Album;
