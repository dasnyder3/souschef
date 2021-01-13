const express = require('express');
const { NamedModulesPlugin } = require('webpack');

const recipesController = require('../controllers/recipesController');

const router = express.Router();

// takes in a recipe url, extracts the ingredients and instructios, returns to requester
router.post('/parse', 
  recipesController.parseRecipe,
  (req, res) => res.status(200).json({...res.locals.recipe}));

module.exports = router;