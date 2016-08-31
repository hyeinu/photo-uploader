import React, { Component } from 'react';
import { Link } from 'react-router';

import UserActions from '../../actions/UserActions'
import AlbumStore from '../../stores/AlbumStore'
import FileUploader from '../FileUploader'


export default class AlbumRow extends Component {
  constructor(){
    super()
    this.state = {
      album: null
    }
    this._onChange = this._onChange.bind(this)
    this._submitFile = this._submitFile.bind(this)
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
  _submitFile(file){
    let id = this.state.album._id
    UserActions.addImage(id, file)
  }
  render() {
    let albumView
    let { album } = this.state

    if(!album){
      albumView = <h1>Loading...</h1>
    } else {
      if(!album.images){
        albumView = (<div></div>)
      } else{
        albumView = album.images.map(image =>{
          return (
            <div className="col-xs-4" key={image._id}>
              <Link to={`/image/${image._id}`}>
                <img src={image.url} alt="" className="img-responsive img-rounded"/>
              </Link>
            </div>
          )
        })
      }
    }
  return (
    <div>
      <div className="col-xs-3">
        <FileUploader submitFile={this._submitFile} />
      </div>
      <div className="col-xs-9">
        {albumView}
      </div>
    </div>
    )
  }
}
