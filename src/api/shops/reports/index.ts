import { axios } from '@/api/lib/axios';
import { Shop } from '@/types';
import { AxiosResponse } from 'axios';

export class ShopsReportsController {
  static create = async (hotpepper_id: string): Promise<Shop> => {
    try {
      const res = (await axios.post(`/shops/${hotpepper_id}/reports`)) as AxiosResponse<Shop>;
      return res.data;
    } catch (err) {
      throw err;
    }
  };

  static destroy = async (hotpepper_id: string): Promise<Shop> => {
    try {
      const res = (await axios.delete(`/shops/${hotpepper_id}/reports/1`)) as AxiosResponse<Shop>;
      return res.data;
    } catch (err) {
      throw err;
    }
  };
}
