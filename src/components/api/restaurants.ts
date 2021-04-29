import baseAxios from 'axios';

const axios = baseAxios.create({
  baseURL: 'http://webservice.recruit.co.jp/hotpepper/gourmet/v1/',
  headers: {
    'Content-Type': 'application/json'
  }
});

const key = process.env.apiKey;

// const searchWithText = async (text: String): Promise<Restaurant[]> => {
//   const params = {
//     key: key,
//     name: text
//   };

//   const res = await axios.get('/', params)
//   console.log(res.data);
// }