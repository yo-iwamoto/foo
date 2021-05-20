import { State } from '../types';

export const initialState: State = {
  utilities: {
    isLoading: false,
    toast: {
      type: null,
      message: ''
    },
    modal: {
      type: null,
      title: '',
      message: '',
      link: null,
      buttonText: ''
    }
  },
  users: {
    isLoggedIn: false,
    uid: '',
    name: '',
    isNewUser: false,
    authProvider: null
  },
  shops: {
    shops: [],
    page: 0
  }
};

// const emptyShop = {
//   id: '',
//   address: '',
//   barrier_free: '',
//   budget: {
//     average: '',
//     name: '',
//   },
//   capacity: 0,
//   card: '利用不可',
//   catch: '',
//   english: 'なし',
//   lat: 0,
//   lng: 0,
//   photo: {
//     pc: {
//       l: ''
//     },
//   },
//   lunch: 'なし',
//   name: '',
//   name_kana: '',
//   parking: '',
//   non_smoking: '',
//   open: '',
//   station_name: '',
//   urls: {
//     pc: ''
//   },
//   wifi: 'なし',
//   like: undefined
// }