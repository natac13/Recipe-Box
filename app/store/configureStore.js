import { createStore, applyMiddleware } from 'redux';
import { compose } from 'ramda';

import rootReducer from '../reducers/';

// Middlewares
import { createLogger } from 'redux-logger';
import apiMiddleware from '../middleware/api.js';
import recipeFormMiddleware from '../middleware/recipeForm.js';

const loggerMiddleware = createLogger();
const middlewares = [
  apiMiddleware,
  recipeFormMiddleware,
];
if (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test') {
  middlewares.push(loggerMiddleware); // no need for logging in production...
}


export default function configureStore(initialState) {
  // https://github.com/zalmoxisus/redux-devtools-extension#12-advanced-store-setup
  const composeEnchancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    // applyMiddleware supercharges createStore with middleware:
    // We can use it exactly like “vanilla” createStore.
  const store = createStore(
    rootReducer,
    initialState,
    composeEnchancers(
      applyMiddleware(...middlewares),
    )
  );

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
