import ServerActions from './actions/ServerActions'
import RouteActions from './actions/RouteActions'
import axios from 'axios'

const API = {
  getAlbums(){
    axios.get('/api/albums')
      .then(res => res.data)
      .then(ServerActions.getAll)
      .catch(console.error)
  },
  getAlbum(id){
    console.log('id:', id)
    axios.get(`/api/albums/${id}`)
      .then(res => res.data)
      .then(ServerActions.getAlbum)
      .catch(console.error)
  },
  getImage(id){
    axios.get(`/api/images/${id}`)
    .then(res => res.data)
    .then(ServerActions.getImage)
    .catch(console.error)
  },
  deleteImage(id){
    axios.delete(`/api/images/${id}`)
    .then(() => {
      this.getAlbums()
      RouteActions.route('/albums')
    })
    .then(ServerActions.getImage)
    .catch(console.error)
  },
  deleteAlbum(id){
    axios.delete(`/api/albums/${id}`)
    .then(() => {
      this.getAlbums()
      RouteActions.route('/albums')
    })
    .catch(console.error)
  },
  addImage(id, file){
    let data = new FormData();
    data.append('image', file)

    axios.post(`/api/images/${id}/addPic`, data)
      .then(() => {
      this.getAlbum(id)
      RouteActions.route(`/album/${id}`)
    })
    .catch(console.error)
  },
  addAlbum(obj){
    axios.post(`/api/albums/`, obj)
    .then(() => {
      this.getAlbums()
      RouteActions.route(`/albums`)
    })
    .catch(console.error)
  },
  editAlbum(id, obj){
    axios.put(`/api/albums/${id}`, obj)
    .then(() => {
      this.getAlbums()
      RouteActions.route(`/albums`)
    })
    .catch(console.error)
  }
}

export default API
