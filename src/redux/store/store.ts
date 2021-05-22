import {
  createStore as reduxCreateStore,
  combineReducers,
  applyMiddleware,
} from 'redux';
import { createLogger } from 'redux-logger';

import { UtilitiesReducer } from '@/redux/utilities/reducers';
import { UsersReducer } from '@/redux/users/reducers';
import { ShopsReducer } from '@/redux/shops/reducers';

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
