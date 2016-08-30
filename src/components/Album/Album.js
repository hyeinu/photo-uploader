import React, { Component } from 'react';
import { Link } from 'react-router';

import UserActions from '../../actions/UserActions'
import AlbumStore from '../../stores/AlbumStore'


export default class AlbumRow extends Component {
  constructor(){
    super()
    this.state = {
      album: null,
      pic_url: null
    }
    this._onChange = this._onChange.bind(this)
    this._onInputChange = this._onInputChange.bind(this)
    this._addImage = this._addImage.bind(this)
  }
  componentDidMount(){
    AlbumStore.startListening(this._onChange)
    UserActions.getAlbum(this.props.params.id)
  }
  componentWillUnmount(){
    AlbumStore.stopListening(this._onChange)
  }
  _onChange(){
  this.setState({album: AlbumStore.getAlbum()})
  }
  _addImage(){
    let newPic = {}
    let id = this.state.album._id
    newPic.pic_url = this.state.pic_url
    UserActions.addImage(id, newPic)
    this.setState({pic_url: ''})
  }
  _onInputChange(e){
  this.setState({pic_url: e.target.value})
  }
  render() {
    let albumView
    let { album } = this.state
    console.log('album:', album)
    if(!album){
      albumView = <h1>Loading...</h1>
    } else {
      if(!album.images){
        albumView = (
          <div className="form-inline">
            <input type="text" className="form-control" placeholder="New Image" value={this.state.pic_url} onChange={this._onInputChange}/>
            <button onClick={this._addImage} className="btn btn-primary">Add Image</button>
          </div>
        )
      } else{
        albumView = album.images.map(image =>{
          return (
            <div className="col-xs-4" key={image._id}>
              <Link to={`/image/${image._id}`}>
                <img src={image.pic_url} alt="" className="img-responsive img-rounded"/>
              </Link>
            </div>
          )
        })
      }
    }
  return (
    <div>
    <div className="form-inline">
      <input type="text" className="form-control" placeholder="New Image" value={this.state.pic_url} onChange={this._onInputChange}/>
      <button onClick={this._addImage} className="btn btn-primary">Add Image</button>
    </div>
    <br />
      {albumView}
    </div>
    )
  }
}
