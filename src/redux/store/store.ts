import {
  createStore as reduxCreateStore,
  combineReducers,
  applyMiddleware,
} from 'redux';
import { createLogger } from 'redux-logger';

import { UtilitiesReducer } from '../utilities/reducers';
import { UsersReducer } from '../users/reducers';
import { ShopsReducer } from '../shops/reducers';

const createStore = () => {
  const middleWares = [];
  if (process.env.NODE_ENV === 'development') {
    const logger = createLogger({
      collapsed: true,
      diff: true,
    });
    middleWares.push(logger);
  }

  return reduxCreateStore(
    combineReducers({
      utilities: UtilitiesReducer,
      users: UsersReducer,
      shops: ShopsReducer,
    }),
    applyMiddleware(...middleWares),
  );
};

export const store = createStore();
