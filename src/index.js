import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import store, { persistedStore } from './app/store';
import { BrowserRouter } from 'react-router-dom/cjs/react-router-dom.min';
import { PersistGate } from 'redux-persist/integration/react';
import LoadingMsg from './loadingMsg';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
      <PersistGate loading={<LoadingMsg/>} persistor={persistedStore}>
        <App />
        </PersistGate>
      </BrowserRouter>
      </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

