const axios = require("axios").default;
const FOOD_API_KEY = require('./keys');

const options = {
  method: 'GET',
  url: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/extract',
  params: { url: 'https://cookieandkate.com/veggie-stir-fry-recipe/' },
  headers: {
    'x-rapidapi-key': FOOD_API_KEY,
    'x-rapidapi-host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
  }
};
console.log('test');

axios.request(options).then(function (response) {
  console.log('success');
  console.log(response.data);
}).catch(function (error) {
  console.log('error')
  console.error(error);
});