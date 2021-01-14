const axios = require("axios").default;
const FOOD_API_KEY = require('../keys');
const models = require('../models/models');

const recipesController = {}; 

recipesController.getRecipes = (req, res, next) => {
  console.log('in getRecipes');
  models.Recipes.find({})
    .exec()
    .then((data) => {
      res.locals.recipes = data;
      return next();
    })
    .catch((err) => next({
      log: `recipesController.getRecipes: ERROR: ${err}`,
      message: { err: 'recipesController.getRecipes: ERROR: Check server logs for details' }
    }));
}

recipesController.findRecipe = (req, res, next) => {
  console.log('in findRecipe');
  models.Recipes.findOne({ url: req.body.url })
    .exec()
    .then((data) => {
      if (data) res.status(200).json({ ...data.recipe.toObject() });
      else return next();
    })
    .catch((err) => next({
      log: `recipesController.findRecipe: ERROR: ${err}`,
      message: { err: 'recipesController.findRecipe: ERROR: Check server logs for details' }
    }))
}

recipesController.parseRecipe = (req, res, next) => {
  if (!res.locals.recipe) {
    console.log('making api request');
    const options = {
      method: 'GET',
      url: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/extract',
      params: { url: req.body.url },
      headers: {
        'x-rapidapi-key': FOOD_API_KEY,
        'x-rapidapi-host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
      }
    };
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
  } else {
    return next();
  }
}

recipesController.saveRecipe = (req, res, next) => {
  models.Recipes.create({
    name: res.locals.recipe.title,
    url: res.locals.recipe.sourceUrl,
    recipe: res.locals.recipe,
  }, (err, data) => {
    if (err) return next({
      log: `recipesController.saveRecipe: ERROR: ${err}`,
      message: { err: 'recipesController.saveRecipe: ERROR: Check server logs for details' }
    })
    return next();
  });
}

module.exports = recipesController;