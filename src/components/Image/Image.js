import React, { Component } from 'react';
import { Link } from 'react-router';

import UserActions from '../../actions/UserActions'
import AlbumStore from '../../stores/AlbumStore'


export default class AlbumRow extends Component {
  constructor(){
    super()
    this.state = {
      image: null
    }
    this._onChange = this._onChange.bind(this)
    this._delete = this._delete.bind(this)
  }
  componentDidMount(){
    AlbumStore.startListening(this._onChange)
    UserActions.getImage(this.props.params.id)
  }
  componentWillUnmount(){
    AlbumStore.stopListening(this._onChange)
  }
  _onChange(){
  this.setState({image: AlbumStore.getImage()})
  }
  _delete(id){
    UserActions.deleteImage(id);
  }
  render() {
    let { image } = this.state
    console.log('image:', image)
  if(!image){
    return(
      <h1>Loading</h1>
    )
  } else{
    return (
      <div>
      <img src={image.pic_url} className="img-rounded"/>
      <h3>{image.time}</h3>
      <button onClick={this._delete.bind(null, image._id)} className="btn">Delete</button>
      </div>
    )
    }
  }
}
