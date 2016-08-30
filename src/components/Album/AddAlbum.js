import React, { Component } from 'react';
import UserActions from '../../actions/UserActions'

export default class App extends Component {
  constructor(){
  super();
    this.state = {
      name: ''
    }
    this._onInputChange = this._onInputChange.bind(this);
  }
  _onInputChange(e){
    this.setState({name: e.target.value})
  }
  addNewAlbum(e){
    e.preventDefault()
    let album = {}
    album.name = this.state.name
    UserActons.addAlbum(album)
  }
  render() {
    return (
      <div className="form-inline">
        <input type="text" className="form-control" placeholder="New Album" value={this.state.name} onChange={this._onInputChange}/>
        <button className="btn btn-info" type="submit" onClick={this.addNewAlbum}><i className="glyphicon glyphicon-plus"></i></button>
      </div>
    )
  }
}
