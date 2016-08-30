import { EventEmitter } from 'events'
import AppDispatcher from '../AppDispatcher'

let _albums = [];
let _album = null
let _image = null

class AlbumStore extends EventEmitter{
  constructor(){
    super();

    AppDispatcher.register(action =>{
      switch(action.type){
        case 'RECIEVE_ALL_ALBUMS':
        _albums = action.albums
        this.emit('Change')
        break;
        case 'RECIEVE_ONE_ALBUM':
        _album = action.album
        this.emit('Change')
        break;
        case 'RECIEVE_IMAGE':
        _image = action.image
        this.emit('Change')
        break;
      }
    })
  }
  startListening(cb){
    this.on('Change', cb)
  }
  stopListening(cb){
    this.removeListener('Change', cb)
  }
  getAlbums(){
    return _albums
  }
  getAlbum(){
    return _album
  }
  getImage(){
    return _image
  }
}

export default new AlbumStore()
