import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router'

import Layout from './components/Layout'
import AllAlbums from './components/Album/AllAlbums'
import Album from './components/Album/Album'
import Image from './components/Image/Image'
import App from './components/App'

render(
  <Router history={browserHistory}>
    <Route path='/' component={Layout}>
      <IndexRoute component={App}></IndexRoute>
      <Route path='/albums' component={AllAlbums}></Route>
      <Route path='/album/:id' component={Album}></Route>
      <Route path='/image/:id' component={Image}></Route>
    </Route>
  </Router>,
  document.getElementById('root')
);
