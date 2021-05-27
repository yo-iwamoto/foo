import { usersLikesController } from './users/likes';
import { shopsLikesController } from './shops/likes';
import { usersController } from './users';
import { firebaseController } from './firebase';
import { hotpepperController } from './hotpepper';

export const apiController = {
  firebase: {
    ...firebaseController,
  },
  hotpepper: {
    ...hotpepperController,
  },
  users: {
    ...usersController,
    likes: {
      ...usersLikesController,
    },
  },
  shops: {
    likes: {
      ...shopsLikesController,
    },
  },
};
