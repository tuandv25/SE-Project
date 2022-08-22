import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';

import {ApolloProvider} from '@apollo/client';
import {Provider} from 'react-redux';

import AppRouter, {history} from './router/AppRouter';
import {firebase} from './firebase/firebase';
import configStore from './store/configStore';
import client from './client/client';
import GetData from './query/GetData';
import getOrder from './query/getOrder';
import getUser from './query/getUser';
import {startSetLogin, logout} from './actions/user';

const store = configStore();
getUser(store.dispatch);
getOrder(store.dispatch);

const root = ReactDOM.createRoot(document.getElementById('root'));

let hasRendered = false;
const renderApp = () => {
  if (!hasRendered) {
    root.render(
      <React.StrictMode>
        <ApolloProvider client={client}>
          <Provider store={store}>
            <AppRouter/>
          </Provider>
        </ApolloProvider>
      </React.StrictMode>
    );
    hasRendered = true;
  }
};

root.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <GetData/>
    </Provider>
  </ApolloProvider>
);

firebase.auth().onAuthStateChanged( function(user) {
  if(user){ 
    if (user.displayName === null){
      history.push("/login");
    }
    else{
    console.log("user"+user.displayName)
    store.dispatch(startSetLogin({name:user.displayName, email: user.email})).then((response) => {
    renderApp()
    history.push(history.location.pathname);
    })
    }
  } else {
    store.dispatch(logout());
    setTimeout(renderApp, 3000);
    history.push('/');
  }
})

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
