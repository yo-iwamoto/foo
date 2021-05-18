import axios from 'axios';
import { Shop, HotpepperResponse, Position } from '../../types';

const key = process.env.NEXT_PUBLIC_API_KEY;
const production = process.env.NODE_ENV === 'production';

let baseUrl = `/hotpepper/gourmet/v1`;
if (production) {
  baseUrl = 'https://shielded-tor-67528.herokuapp.com/https://webservice.recruit.co.jp' + baseUrl;
}

export const searchWithKeywordAndPosition = async (keyword: string, position: Position, range: number): Promise<HotpepperResponse> => {
  const params = {
    ...position,
    key: key,
    range: range,
    keyword: keyword,
    format: 'json',
    count: 30
  }
  const res = await axios.get(baseUrl, { params: params });
  return res.data.results;
};