const axios = require("axios").default;
const FOOD_API_KEY = require('../keys');

const recipesController = {}; 

recipesController.parseRecipe = (req, res, next) => {
  const options = {
    method: 'GET',
    url: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/extract',
    params: { url: req.body.url },
    headers: {
      'x-rapidapi-key': FOOD_API_KEY,
      'x-rapidapi-host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
    }
  };
  console.log(req.body.url);
  axios.request(options)
    .then((response) => {
      res.locals.recipe = response.data;
      return next();
    })
    .catch((err) => {
      return next({
        log: `recipesController.parseRecipe: ERROR: ${err}`,
        message: { err: 'recipesController.parseRecipe: ERROR: Check server logs for details' }
      });
    });
}

module.exports = recipesController;