const express = require('express');
const { NamedModulesPlugin } = require('webpack');

const recipesController = require('../controllers/recipesController');

const router = express.Router();

// takes in a recipe url, extracts the ingredients and instructios, returns to requester
router.post('/parse',
  recipesController.findRecipe,
  recipesController.parseRecipe,
  recipesController.addRecipe,
  recipesController.saveRecipe,
  (req, res) => res.status(200).json({ ...res.locals.recipe }));

router.post('/cooked/:userId',
  recipesController.markCooked,
  (req, res) => res.sendStatus(200)
)

router.post('/notcooked/:userId',
  recipesController.markNotCooked,
  (req, res) => res.sendStatus(200)
)

router.post('/delete/:userId',
  recipesController.deleteRecipe,
  (req, res) => res.sendStatus(200)
)

router.get('/:userId',
  recipesController.getUserRecipes,
  recipesController.getRecipes,
  (req, res) => res.status(200).json([...res.locals.userRecipes]));

module.exports = router;