import { axios } from '@/api/lib/axios';
import { FooEndPoint } from '@/api/lib/url';
import { Shop } from '@/types';
import { AxiosResponse } from 'axios';

export class ShopsReportsController {
  static create = async (hotpepper_id: string): Promise<Shop> => {
    const endPoint = new FooEndPoint(`/shops/${hotpepper_id}/reports`);
    try {
      const res = (await axios.post(endPoint.url)) as AxiosResponse<Shop>;
      return res.data;
    } catch (err) {
      throw err;
    }
  };

  static destroy = async (hotpepper_id: string): Promise<Shop> => {
    const endPoint = new FooEndPoint(`/shops/${hotpepper_id}/reports/1`);
    try {
      const res = (await axios.delete(endPoint.url)) as AxiosResponse<Shop>;
      return res.data;
    } catch (err) {
      throw err;
    }
  };
}
