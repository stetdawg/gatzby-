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
        limit: 5,
        //term: 'target walmart bestbuy',
        radius: 20000,
        //sort_by: 'best_match',
        categories: 'deptstores',
        //open_now: true,
        ...userLocation
      }
    })
    .then(res =>
      res.data.businesses.map(business => {
        return {
          name: business.name,
          coords: business.coordinates,
          addr: business.location.address1,
          image: business.image_url,
          reviews: business.review_count,
          distance: business.distance,
          id: business.id,
          phone: business.phone,
          city: business.location.city,
          state1: business.location.state,
          zip: business.location.zip_code

        };
      })
    )
    .catch(error => console.error(error));
};

export default {
  getStores
};
