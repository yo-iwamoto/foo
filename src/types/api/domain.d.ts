export type UserResponse = {
  user: {
    name: string;
    uid: string;
  };
};

export type LikeResponse = {
  message: string;
};

export type GetLikesResponse = {
  result: boolean[];
};

export type UpdateNameResource = {
  uid: string;
  name: string;
};

export type FooShop = {
  hotpepper_id: string;
  isLiked: boolean;
  isReported: boolean;
  likesCount: number;
  reportsCount: number;
};

export type LikedShopIndexResponse = {
  shops: FooShop[];
};

export type FooSignInResource = {
  name: string;
  uid: string;
};

export type Shop = {
  id: string;
  address: string;
  barrier_free: string;
  budget: {
    average: string;
    name: string;
  };
  capacity: number;
  card: '利用可' | '利用不可';
  catch_copy: string;
  english: AriOrNashi;
  genre: {
    name: string;
  };
  lat: number;
  lng: number;
  photo: string;
  lunch: AriOrNashi;
  name: string;
  name_kana: string;
  parking: string;
  non_smoking: string;
  open: string;
  station_name: string;
  url: string;
  wifi: AriOrNashi;
  foo: boolean;
  liked: boolean;
  foo_count: number;
  likes_count: number;
};

type AriOrNashi = 'あり' | 'なし';
