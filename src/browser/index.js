/* eslint-disable import/default */
import React from 'react';
import ReactDOM from 'react-dom';
//
import {
  AppContainer
} from 'react-hot-loader';

// Root Layout
import LayoutRoot from './components/layout_root';

// Get Mount Element
const mountEl = document.getElementById('root');
// Hot Render Func
const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>
    , mountEl
  );
};

// Render Root Layout
render(LayoutRoot);

// // Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./components/layout_root', () => render(LayoutRoot));
}
