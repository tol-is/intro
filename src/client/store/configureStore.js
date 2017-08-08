import { applyMiddleware, createStore, compose, combineReducers } from 'redux';
// import {persistStore, autoRehydrate, getStoredState, createPersistor} from 'redux-persist';
import configureReducer from './configureReducer';
import configureMiddleware from './configureMiddleware';

export default function configureStore (options) {

  const {
    platformMiddleware = [],
    platformReducers = {},
    platformEnchancers = [],
    initialState = {}
  } = options;

  const rootReducer = configureReducer(platformReducers);

  const middleware = configureMiddleware(platformMiddleware);

  const store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(...middleware),
      ...platformEnchancers
    )
  );

  store.asyncReducers = {};

  const replaceReducers = (defaultReducers) => {
    const merged = Object.assign({}, defaultReducers, store.asyncReducers);
    const combined = combineReducers(merged);
    store.replaceReducer(combined);
  };

  store.injectAsyncReducers = (asyncReducers) => {
    const injectReducers = Object.keys(asyncReducers).reduce((all, item) => {
      if (store.asyncReducers[item]) {
        delete all[item];
      }

      return all;
    }, asyncReducers);

    store.asyncReducers = Object.assign({}, store.asyncReducers, injectReducers);
    replaceReducers(rootReducer);
  };

  // Enable hot reload where available.
  if (module.hot) {
    const hotReplace = configureReducer => replaceReducers(configureReducer(platformReducers));
    module.hot.accept('./configureReducer', () => {
      hotReplace(require('./configureReducer'));
    });
  }

  return store;
}
