const mongoose = require('mongoose')

const imageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  pic_url: { type: String, required: true },
  s3_key: { type: String, required: true },
  time: { type: Date, default: Date.now }
})

imageSchema.statics.upload = function(fileObj, cb){
  let { originalname, buffer } = fileObj;
  let Key = uuid() + path.extname(originalname);

  let params = {
    Bucket: BUCKET_NAME,
    Key,
    ACL: 'public-read',
    Body: buffer
  };
  s3.putObject(params, (err, result)=>{
    if (err) return cb(err);
    let url = `${AWS_URL_BASE}/${BUCKET_NAME}/${Key}`;

    this.create({ name: originalname, url, s3_key: Key}, cb);
  });
};

imageSchema.pre('remove', function(next) {
  this.model('Album').remove({ images: this._id }, next)

});

const Image = mongoose.model('Image', imageSchema);

module.exports = Image;
