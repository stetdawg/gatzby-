import axios from 'axios';

const YELP_API_KEY = 'EuD3hzLX9i9dj5I8_tqsVa1QHV50F8x-xi2MeJzFC1JD-_gV2aPWFXKNgNXywlvWIwl7p0ZZ8p23ECMozUhNJuajYgvCjM9LgAya4DP2vG3XrXd9OBXmouZi0-ujXHYx';

const api = axios.create({
  baseURL: 'https://api.yelp.com/v3',
  headers: {
    Authorization: `Bearer ${YELP_API_KEY}`
  }
});

const getStores = userLocation => {
  return api
    .get('/businesses/search', {
      params: {
        limit: 20,
        term: 'walmart, target, bestbuy',
        //radius: 20000,
        //sort_by: 'best_match',
        //categories: 'electronics',
        //open_now: true,
        ...userLocation
      }
    })
    .then(res =>
      res.data.businesses.map(business => {
        return {
          name: business.name,
          coords: business.coordinates
        };
      })
    )
    .catch(error => console.error(error));
};

export default {
  getStores
};
