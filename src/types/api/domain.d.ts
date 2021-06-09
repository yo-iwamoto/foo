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
