import axios from 'axios';


const BASE_URL = 'https://pixabay.com/api';
const API_KEY = '46511774-6d45b03e21a284b47c5b7e772';


export const getPhotos = async (query, page) => {
  const params = {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page,
        per_page: 15,
      };

    return axios.get(BASE_URL, {params: params});
};

export const incrementPage = () => {
  page += 1;
};

export const resetPage = () => {
  page = 1;
};
