import React, { Component } from 'react';

export default class FileUploader extends Component {
  constructor(){
    super();

    this.state = {
      file: '',
      imagePreviewURL: ''
    }
    this._onInputChange = this._onInputChange.bind(this)
    this._onSubmit = this._onSubmit.bind(this)
  }
  _onSubmit(e){
    e.preventDefault()
    this.props.submitFile(this.state.file)
    this.setState({
      file: '',
      imagePreviewURL: ''
    })
  }
  _onInputChange(e){
    let reader = new FileReader();
    let file = e.target.files[0]
    reader.onloadend = () =>{
      this.setState({ file, imagePreviewURL: reader.result });
    };
    reader.readAsDataURL(file);
  }
  render() {
    let { imagePreviewURL } = this.state;
    let ImagePreview = imagePreviewURL &&  <img src={imagePreviewURL} className="center-block img-rounded img-responsive" />

    return (
      <div>
          <form onSubmit={this._onSubmit}>
            <input type="file" className="btn" onChange={this._onInputChange} />
            <button className="btn btn-primary form-control">Upload</button>
          </form>
          { ImagePreview }
      </div>
    )
  }
}
