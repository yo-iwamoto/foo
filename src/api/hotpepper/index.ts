import axios, { AxiosResponse } from 'axios';
import { Position, Shop } from '@/types';
import { FooEndPoint } from '../lib/url';

type IndexResponse = {
  available_count: number;
  shops: Shop[];
};

type IndexPayload = {
  keyword?: string;
  position?: Position;
  range?: number;
  ids?: string[];
};

class ShopsController {
  static index = async function (payload: IndexPayload): Promise<IndexResponse> {
    try {
      if (payload.keyword) {
        const endPoint = new FooEndPoint('/hotpepper/shops')
          .addParams('keyword', payload.keyword)
          .addParams('range', payload.range!.toString())
          .addParams('format', 'json')
          .addParams('count', '30');
        const res = (await axios.get(endPoint.url)) as AxiosResponse<IndexResponse>;
        return res.data;
      } else {
        const endPoint = new FooEndPoint('/hotpepper/shops')
          .addParams('id', payload.ids!.join())
          .addParams('format', 'json');
        const res = (await axios.get(endPoint.url)) as AxiosResponse<IndexResponse>;
        return res.data;
      }
    } catch (err) {
      console.error(err);
      throw err;
    }
  };
}
