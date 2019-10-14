import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import * as reducers from './reducers';

const reducer = combineReducers(reducers);

function broadcastRouter() {
  return (next) => (payload) => {
    const { action } = payload;
    if (action.type === 'TOGGLE_PLAYING') {
      delete action.meta.target;
    }
    next(payload);
  };
}

function storeFactory(reducer) {
  return createStore(
    reducer,
    compose(
      // window.__REDUX_DEVTOOLS_EXTENSION__ &&
      //   window.__REDUX_DEVTOOLS_EXTENSION__(),
      applyMiddleware(broadcastRouter),
    ),
  );
}

export default storeFactory(reducer);
