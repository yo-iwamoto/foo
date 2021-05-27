import axios, { AxiosResponse } from 'axios';
import { Position, Shop } from '@/types';

type HotpepperResponse = {
  results: HotpepperIndexReturnType;
};

type HotpepperIndexReturnType = {
  results_available: number;
  shop: Shop[];
};

type HotpepperIndexPayload = {
  keyword?: string;
  position?: Position;
  range?: number;
  ids?: string[];
};

const key = process.env.NEXT_PUBLIC_API_KEY;
const production = process.env.NODE_ENV === 'production';

let baseUrl = `/hotpepper/gourmet/v1`;
if (production) {
  baseUrl = 'https://shielded-tor-67528.herokuapp.com/https://webservice.recruit.co.jp' + baseUrl;
}

const index = async (payload: HotpepperIndexPayload): Promise<HotpepperIndexReturnType> => {
  try {
    if (payload.keyword) {
      const params = {
        ...payload.position,
        key: key,
        range: payload.range,
        keyword: payload.keyword,
        format: 'json',
        count: 30,
      };
      const res = (await axios.get(baseUrl, {
        params: params,
      })) as AxiosResponse<HotpepperResponse>;
      return res.data.results;
    } else {
      const params = {
        key: key,
        id: payload.ids!.join(),
        format: 'json',
      };
      const res = (await axios.get(baseUrl, {
        params: params,
      })) as AxiosResponse<HotpepperResponse>;
      return res.data.results;
    }
  } catch (err) {
    throw err;
  }
};

export const hotpepperController = {
  index,
};

// export const getShopsByKeywordAndPosition = async (
//   payload: GetShopsByKeywordAndPositionPayload,
// ): Promise<HotpepperReturnType> => {
//   const params = {
//     ...payload.position,
//     key: key,
//     range: payload.range,
//     keyword: payload.keyword,
//     format: 'json',
//     count: 30,
//   };
//   try {
//     const res = (await axios.get(baseUrl, {
//       params: params,
//     })) as AxiosResponse<HotpepperResponse>;
//     return res.data.results;
//   } catch (err) {
//     throw err;
//   }
// };

// export const getShopsById = async (
//   ids: string[],
// ): Promise<HotpepperReturnType> => {
//   const params = {
//     key: key,
//     id: ids.join(),
//     format: 'json',
//   };
//   try {
//     const res = (await axios.get(baseUrl, {
//       params: params,
//     })) as AxiosResponse<HotpepperResponse>;
//     return res.data.results;
//   } catch (err) {
//     throw err;
//   }
// };
