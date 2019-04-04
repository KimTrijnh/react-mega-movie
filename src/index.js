import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import App from './App';
import { Route, Link, BrowserRouter, Switch } from 'react-router-dom'
import MovieInfo from "./MovieInfo";
import Notfound from './notfound';
import * as serviceWorker from './serviceWorker';

const routing = (

    <BrowserRouter>
        <Switch>
          <Route exact path="/" component={App} />
          <Route path="/movieInfo/:id" component={MovieInfo} />
          <Route component={Notfound} />
        </Switch>
    </BrowserRouter>
  )
  
ReactDOM.render(routing, document.getElementById('root'))

//ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA