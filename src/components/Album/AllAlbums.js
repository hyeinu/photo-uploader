import React, { Component } from 'react';
import { Link } from 'react-router';

import AlbumStore from '../../stores/AlbumStore'
import UserActions from '../../actions/UserActions'
import AddAlbum from './AddAlbum'

export default class AllAlbums extends Component {
  constructor(){
    super()
    this.state = {
      name: '',
      albums: UserActions.getAlbums()
    }
    this._onInputChange = this._onInputChange.bind(this)
    this._onChange = this._onChange.bind(this)
    this._delete = this._delete.bind(this)
    this._edit = this._edit.bind(this)
  }
  componentDidMount(){
    AlbumStore.startListening(this._onChange)
  }
  componentWillUnmount(){
    AlbumStore.stopListening(this._onChange)
  }
  _onChange(){
  this.setState({albums: AlbumStore.getAlbums()})
  }
  _delete(id){
    UserActions.deleteAlbum(id);
  }
  _edit(id){
    let obj = {}
    obj.name = this.state.name
    UserActions.editAlbum(id, obj);
    this.setState({name: ''})
  }
  _onInputChange(e){
    this.setState({name: e.target.value})
  }
  render() {
    let albumView
    if(!this.state.albums){
      albumView = <h1>Loading...</h1>
    } else {
      albumView = this.state.albums.map(album =>{
        return (
          <div key={album._id}>
          <Link to={`/album/${album._id}`}>
          <h1>{album.name}</h1>
          </Link>
          <button className="btn btn-info" onClick={this._edit.bind(null, album._id)}>Edit</button>
          <button className="btn btn-danger" onClick={this._delete.bind(null, album._id)}>Delete</button>
          </div>
        )
      })
    }
    return (
      <div>
        <AddAlbum />
        <input type="text" className="form-control" placeholder="Edit Album Name" value={this.state.name} onChange={this._onInputChange}/>
        {albumView}
      </div>
    )
  }
}
