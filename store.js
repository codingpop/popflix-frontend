import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

const store = createStore(
  window.devToolsExtension ? window.devToolsExtension() : f => f,
  compose(applyMiddleware(thunk)),
);

export default store;
