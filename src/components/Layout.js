import React, { Component } from 'react';
import { Link } from 'react-router';

export default class Layout extends Component {

  render() {
    return (
      <div>
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <a className="navbar-brand glyphicon glyphicon-heart-empty"></a>
            </div>
            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
              <ul className="nav navbar-nav">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/albums">Albums</Link></li>
              </ul>
              <ul className="nav navbar-nav navbar-right">
              </ul>
            </div>
          </div>
        </nav>
        <div className="container">
          <div className="row">
          {this.props.children}
          </div>
        </div>
      </div>
    )
  }
}
