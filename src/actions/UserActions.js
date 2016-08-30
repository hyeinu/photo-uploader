import API from '../API'

const UserActions = {
  getAlbums: API.getAlbums,
  getAlbum: API.getAlbum,
  getImage: API.getImage,
  deleteImage: API.deleteImage,
  addImage: API.addImage,
  deleteAlbum: API.deleteAlbum,
  editAlbum: API.editAlbum
}

export default UserActions;
