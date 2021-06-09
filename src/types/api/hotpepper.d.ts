import { FooShop } from './domain';

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
  catch: string;
  english: AriOrNashi;
  genre: {
    name: string;
  };
  lat: number;
  lng: number;
  photo: {
    pc: {
      l: string;
    };
  };
  lunch: AriOrNashi;
  name: string;
  name_kana: string;
  parking: string;
  non_smoking: string;
  open: string;
  station_name: string;
  urls: {
    pc: string;
  };
  wifi: AriOrNashi;
  foo: FooShop | undefined;
};

type AriOrNashi = 'あり' | 'なし';
