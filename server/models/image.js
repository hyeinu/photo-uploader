const BUCKET_NAME = 'hyeinu-pb-album-loader';
const AWS_URL_BASE = 'https://s3-us-west-2.amazonaws.com';

const mongoose = require('mongoose')
const AWS = require('aws-sdk');
const uuid = require('uuid');
const path = require('path');

const s3 = new AWS.S3();

const imageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  url: { type: String, required: true },
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
  let id = this._id;
  let params = {
    Bucket: BUCKET_NAME,
    Key: this.s3_key
  }

  s3.deleteObjects(params, err =>{
   if (err) return next(err)

    mongoose.model('Album').find({ images: id }, err =>{
      album.images.filter(image => image.toString() !== id.toString())
      album.save(err =>{
        next();
      });
    })
  })
});

const Image = mongoose.model('Image', imageSchema);

module.exports = Image;
