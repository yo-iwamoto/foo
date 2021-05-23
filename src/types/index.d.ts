import React from 'react';

export interface NavMenu {
  text: string;
  href: string;
}

export interface DrawerMenu {
  text: string;
  href: string;
  icon: React.ReactNode;
}

export interface Shop {
  id: string;
  address: string;
  barrier_free: string;
  budget: {
    average: string;
    name: string;
  };
  capacity: number;
  card: '利用可' | '利用不可';
  catch: string;
  english: AriOrNashi;
  lat: number;
  lng: number;
  photo: ShopPhoto;
  lunch: AriOrNashi;
  name: string;
  name_kana: string;
  parking: string;
  non_smoking: string;
  open: string;
  station_name: string;
  urls: ShopUrls;
  wifi: AriOrNashi;
  like: boolean | undefined;
}

export interface ShopPhoto {
  pc: {
    l: string;
  };
}

export interface ShopUrls {
  pc: string;
}

type AriOrNashi = 'あり' | 'なし';

export interface HotpepperResponse {
  results: HotpepperResult;
}

export interface HotpepperResult {
  results_available: number;
  shop: Shop[];
}

export interface Position {
  lat: number;
  lng: number;
}

export type TableRow = {
  key: string;
  value: string;
};

import { AuthProvider } from '@/redux/types';

export interface FirebaseSignInResponse {
  name: string;
  uid: string;
  isNewUser: boolean;
  authProvider: AuthProvider;
}

export interface FirebasePayload {
  email: string;
  password: string;
}

export interface FooSignInResource {
  name: string;
  uid: string;
}

export type FooUser = {
  user: {
    name: string;
    uid: string;
  };
};

export type VerificationPayload = string;

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

export interface FooShop {
  hotpepper_id: string;
}

export interface LikedShopIndexResponse {
  shops: FooShop[];
}
