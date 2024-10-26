import axios from 'axios';

const API_KEY = '46511774-6d45b03e21a284b47c5b7e772';

axios.defaults.baseURL = 'https://pixabay.com/api/';

const getPhotos = (query, page) => {
  return axios.get('', {
    params: {
      key: API_KEY,
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: 15,
      page,
    },
  });
};

export default getPhotos;
