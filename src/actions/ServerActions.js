import AppDispatcher from '../AppDispatcher'

const ServerActions = {
  getAll(albums){
    AppDispatcher.dispatch({
      type: 'RECIEVE_ALL_ALBUMS',
      albums
    })
  },
  getAlbum(album){
    AppDispatcher.dispatch({
      type: 'RECIEVE_ONE_ALBUM',
      album
    })
  },
  getImage(image){
    AppDispatcher.dispatch({
      type: 'RECIEVE_IMAGE',
      image
    })
  }

}

export default ServerActions
