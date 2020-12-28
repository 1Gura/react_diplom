import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './style.scss'
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from 'react-redux'
import thunk from 'redux-thunk'
import {createStore, applyMiddleware} from "redux";
import {composeWithDevTools} from 'redux-devtools-extension'
import rootReducer from "./reducers";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import PostContainer from "./Containers/PostContainer";
import Auth from "./Components/Auth";
import Unsplash from "unsplash-js";
//import store from './store'

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
);

ReactDOM.render(
   <BrowserRouter>
      <Provider store = {store}>
        <React.StrictMode>
            <App>
                <Switch>
                    <Route exact path ='/' component = {PostContainer}/>
                    <Route  path ='/Auth' component = {Auth}/>
                </Switch>
            </App>
        </React.StrictMode>
      </Provider>
   </BrowserRouter>
    ,
  document.getElementById('root')
);

reportWebVitals();
