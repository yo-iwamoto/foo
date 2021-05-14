import axios from 'axios';
import { Shop, HotpepperResponse } from '../../types';

const key = process.env.NEXT_PUBLIC_API_KEY;
const production = process.env.NODE_ENV === 'production';

let baseUrl = `/hotpepper/gourmet/v1`;
if (production) {
  baseUrl = 'https://shielded-tor-67528.herokuapp.com/https://webservice.recruit.co.jp' + baseUrl;
}

export const searchWithText = async (keyword: string): Promise<HotpepperResponse> => {
  const keywordFormatted = keyword.replace(/\s+/g, ' ');
  const params = {
    key: key,
    keyword: keywordFormatted,
    format: 'json'
  }
  const res = await axios.get(baseUrl, { params: params });
  return res.data.results;
}