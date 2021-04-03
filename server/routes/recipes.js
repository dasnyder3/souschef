const express = require('express');
const { NamedModulesPlugin } = require('webpack');

const recipesController = require('../controllers/recipesController');
const { checkUserLoggedIn } = require('../controllers/authController');

const router = express.Router();

router.use(checkUserLoggedIn);

// takes in a recipe url, extracts the ingredients and instructios, returns to requester
router.post(
  '/parse',
  recipesController.findRecipe,
  recipesController.parseRecipe,
  recipesController.addRecipe,
  recipesController.addRecipeToPostgres,
  recipesController.saveUserRecipe,
  (req, res) => res.status(200).json({ ...res.locals.recipe })
);

router.post('/cooked/:userId', recipesController.markCooked, (req, res) =>
  res.sendStatus(200)
);

router.post('/notcooked/:userId', recipesController.markNotCooked, (req, res) =>
  res.sendStatus(200)
);

router.delete('/:recipeId', recipesController.deleteRecipe, (req, res) =>
  res.sendStatus(200)
);

router.get(
  '/',
  recipesController.getUserRecipes,
  recipesController.getRecipes,
  (req, res) => res.status(200).json([...res.locals.userRecipes])
);

module.exports = router;
