import axios from 'axios';
import { Shop, HotpepperResponse } from '../../types';

const key = process.env.apiKey;
const production = process.env.NODE_ENV === 'production';
let baseUrl = `/hotpepper/gourmet/v1?key=${key}&format=json`;
if (production) {
  baseUrl = 'https://webservice.recruit.co.jp' + baseUrl;
}
console.log(baseUrl)

const joinParameter = (url: string, key: string, value: string): string => {
  return `${url}&${key}=${value}`;
}

export const searchWithText = async (keyword: string): Promise<HotpepperResponse> => {
  const keywordFormatted = keyword.replace(/\s+/g, ' ');
  const url = joinParameter(baseUrl, 'keyword', keywordFormatted);
  const res = await axios.get(url);
  return res.data.results;
}