/* eslint-disable import/default */
import 'reset-css/reset.css';
import React from 'react';
import ReactDOM from 'react-dom';
//
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppContainer } from 'react-hot-loader';

// Shared Imports
import ApolloClient from 'Client/lib/apollo/client';
import configureStore from 'Client/store/configureStore';

// Import Core App
import LayoutRoot from 'Browser/components/layout_root';

// TODO: Initial State
const initialState = JSON.parse(window.INITIAL_STATE);

// Platform Reducers
const platformReducers = { };

// Platform Middleware
const platformMiddleware = [ ];

// Platform Enchanchers
const platformEnchancers = [];
if (process.env.NODE_ENV === 'development' && process.browser && window.devToolsExtension) {
  platformEnchancers.push(window.devToolsExtension());
}

// Configure Store
const store = configureStore({
  platformReducers,
  platformMiddleware,
  platformEnchancers,
  initialState
});

// Get Mount Element
const mountEl = document.getElementById('root');

// console.log(routes);

// Hot Render Func
const render = Component => {
  ReactDOM.render(
    <ApolloProvider store={store} client={ApolloClient}>
      <Router>
        <AppContainer>
          <Component/>
        </AppContainer>
      </Router>
    </ApolloProvider>
    , mountEl
  );
};

// Render Root Layout
render(LayoutRoot);

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./components/layout_root', () => render(LayoutRoot));
}
