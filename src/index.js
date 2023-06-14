import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {applyMiddleware, compose, createStore} from 'redux'
import { Provider } from 'react-redux'
import {rootReducer} from "./redux/rootReducer";
import thunk from "redux-thunk";
import {HashRouter} from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));


const store = createStore(rootReducer, compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
));
root.render(
  <HashRouter>
      <Provider store={store}>
        <App />
      </Provider>
  </HashRouter>
);
