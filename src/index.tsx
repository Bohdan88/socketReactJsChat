import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Join from './components/Join';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import * as serviceWorker from './serviceWorker';
import 'bulma/css/bulma.css';
import './styles/index.scss';

ReactDOM.render(
  // <React.StrictMode>
  <Router>
    <Route path="/" exact component={Join} />
    <Route path="/app" component={App} />
  </Router>,
  // </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
