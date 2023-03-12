import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import { store } from "./store";

import './styles/style.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { AppError } from './components/AppError';

console.clear();
serviceWorker.unregister();

ReactDOM.render(
  <React.StrictMode>
    <AppError>
      <Provider store={store} >
      <App />
      </Provider>
    </AppError>
    
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
