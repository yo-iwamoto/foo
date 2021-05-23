import axios, { AxiosResponse } from 'axios';
import { HotpepperResult, HotpepperResponse, Position, Shop } from '@/types';

const key = process.env.NEXT_PUBLIC_API_KEY;
const production = process.env.NODE_ENV === 'production';

let baseUrl = `/hotpepper/gourmet/v1`;
if (production) {
  baseUrl =
    'https://shielded-tor-67528.herokuapp.com/https://webservice.recruit.co.jp' +
    baseUrl;
}

export const searchWithKeywordAndPosition = async (
  keyword: string,
  position: Position,
  range: number,
): Promise<HotpepperResult> => {
  const params = {
    ...position,
    key: key,
    range: range,
    keyword: keyword,
    format: 'json',
    count: 30,
  };
  try {
    const res = (await axios.get(baseUrl, {
      params: params,
    })) as AxiosResponse<HotpepperResponse>;
    return res.data.results;
  } catch (err) {
    throw err;
  }
};

export const getShopsById = async (ids: string[]): Promise<HotpepperResult> => {
  const params = {
    key: key,
    id: ids.join(),
    format: 'json',
  };
  console.log(params.id, ids);
  try {
    const res = (await axios.get(baseUrl, {
      params: params,
    })) as AxiosResponse<HotpepperResponse>;
    return res.data.results;
  } catch (err) {
    throw err;
  }
};
