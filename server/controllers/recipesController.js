const axios = require('axios').default;
const { FOOD_API_KEY } = require('../keys');
const models = require('../models/models');
const db = require('../models/pgModel');

const recipesController = {};

recipesController.getRecipes = (req, res, next) => {
  const recipeIds = res.locals.userRecipes.map((ele) => ele.recipeId);
  models.Recipes.find({ _id: { $in: recipeIds } })
    .exec()
    .then((data) => {
      const newUserRecipes = res.locals.userRecipes.map((userRecipe) => {
        const newUserRecipe = userRecipe.toObject();
        const recipeDetails = data.filter(
          (ele) => ele._id.toString() === userRecipe.recipeId.toString()
        )[0];
        newUserRecipe.details = recipeDetails;
        return newUserRecipe;
      });
      res.locals.userRecipes = newUserRecipes;
      return next();
    })
    .catch((err) =>
      next({
        log: `recipesController.getRecipes: ERROR: ${err}`,
        message: {
          err:
            'recipesController.getRecipes: ERROR: Check server logs for details',
        },
      })
    );
};

recipesController.findRecipe = (req, res, next) => {
  models.Recipes.findOne({ url: req.body.url })
    .exec()
    .then((data) => {
      if (data) {
        res.locals.recipeId = data._id; //res.status(200).json({ ...data.recipe.toObject() });
        res.redirect('/recipes/saveExisting');
      } else {
        res.redirect('/recipes/addNew');
      }
      // return next();
    })
    .catch((err) =>
      next({
        log: `recipesController.findRecipe: ERROR: ${err}`,
        message: {
          err:
            'recipesController.findRecipe: ERROR: Check server logs for details',
        },
      })
    );
};

recipesController.parseRecipe = (req, res, next) => {
  console.log('in parseRecipe');
  if (!res.locals.recipeId) {
    const options = {
      method: 'GET',
      url:
        'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/extract',
      params: { url: req.body.url },
      headers: {
        'x-rapidapi-key': FOOD_API_KEY,
        'x-rapidapi-host':
          'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
      },
    };
    axios
      .request(options)
      .then((response) => {
        res.locals.recipe = response.data;
        return next();
      })
      .catch((err) => {
        console.log('err: ', err);
        return next({
          log: `recipesController.parseRecipe: ERROR: ${err}`,
          message: {
            err:
              'recipesController.parseRecipe: ERROR: Check server logs for details',
          },
        });
      });
  } else {
    return next();
  }
};

recipesController.addRecipe = (req, res, next) => {
  if (!res.locals.recipeId) {
    models.Recipes.create(
      {
        name: res.locals.recipe.title,
        url: res.locals.recipe.sourceUrl,
        recipe: res.locals.recipe,
      },
      (err, data) => {
        if (err)
          return next({
            log: `recipesController.addRecipe: ERROR: ${err}`,
            message: {
              err:
                'recipesController.addRecipe: ERROR: Check server logs for details',
            },
          });
        res.locals.recipeId = data._id;
        return next();
      }
    );
  } else {
    return next();
  }
};

recipesController.addRecipeToPostgres = (req, res, next) => {
  const query = `
    INSERT INTO recipes (mongo_id)
    VALUES ($1)
    `;
  const params = [res.locals.recipeId];
  db.query(query, params)
    .then(() => next())
    .catch((err) => {
      return next({
        log: `recipesController.addRecipeToPostgres: ERROR: ${err}`,
        message: {
          err:
            'recipesController.addRecipeToPostgress: ERROR: Check server logs for details',
        },
      });
    });
};

recipesController.saveRecipe = (req, res, next) => {
  models.SavedRecipes.findOneAndUpdate(
    { userId: 'user1' },
    { $push: { recipes: { recipeId: res.locals.recipeId } } },
    {
      upsert: true,
      useFindAndModify: false,
    },
    (err, data) => {
      if (err)
        return next({
          log: `recipesController.saveRecipe: ERROR: ${err}`,
          message: {
            err:
              'recipesController.saveRecipe: ERROR: Check server logs for details',
          },
        });
      return next();
    }
  );
};

recipesController.getUserRecipes = (req, res, next) => {
  models.SavedRecipes.findOne({
    userId: req.params.userId,
  })
    .exec()
    .then((data) => {
      res.locals.userRecipes = data.recipes;
      // res.locals.recipeIds = data.recipes.map((ele) => ele.recipeId);
      return next();
    })
    .catch((err) =>
      next({
        log: `recipesController.getUserRecipes: ERROR: ${err}`,
        message: {
          err:
            'recipesController.getUserRecipes: ERROR: Check server logs for details',
        },
      })
    );
};

recipesController.deleteRecipe = (req, res, next) => {
  console.log('recipeId', req.body.recipeId);
  models.SavedRecipes.updateOne(
    {
      userId: req.params.userId,
    },
    {
      $pull: { recipes: { recipeId: req.body.recipeId } },
    },
    (err, data) => {
      if (err)
        return next({
          log: `recipesController.deleteRecipe: ERROR: ${err}`,
          message: {
            err:
              'recipesController.deleteRecipe: ERROR: Check server logs for details',
          },
        });
      return next();
    }
  );
};

recipesController.markCooked = (req, res, next) => {
  // console.log('in markCompleted')
  models.SavedRecipes.updateOne(
    {
      userId: req.params.userId,
      'recipes.recipeId': req.body.recipeId,
    },
    {
      $set: { 'recipes.$.cooked': true },
    },
    (err, data) => {
      if (err)
        return next({
          log: `recipesController.markCooked: ERROR: ${err}`,
          message: {
            err:
              'recipesController.markCooked: ERROR: Check server logs for details',
          },
        });
      return next();
    }
  );
};

recipesController.markNotCooked = (req, res, next) => {
  // console.log('in markCompleted')
  models.SavedRecipes.updateOne(
    {
      userId: req.params.userId,
      'recipes.recipeId': req.body.recipeId,
    },
    {
      $set: { 'recipes.$.cooked': false },
    },
    (err, data) => {
      if (err)
        return next({
          log: `recipesController.markNotCooked: ERROR: ${err}`,
          message: {
            err:
              'recipesController.markNotCooked: ERROR: Check server logs for details',
          },
        });
      return next();
    }
  );
};

module.exports = recipesController;
