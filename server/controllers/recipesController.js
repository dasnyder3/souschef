const axios = require('axios').default;
const { FOOD_API_KEY } = require('../keys');
const models = require('../models/models');
const db = require('../models/pgModel');

const recipesController = {};

recipesController.getRecipes = (req, res, next) => {
  const recipeIds = res.locals.userRecipes.map((ele) => ele.mongo_id);
  models.Recipes.find({ _id: { $in: recipeIds } })
    .exec()
    .then((data) => {
      res.locals.userRecipes.forEach((userRecipe) => {
        userRecipe.recipeDetails = data.filter((ele) => {
          return ele._id.toString() === userRecipe.mongo_id.toString();
        })[0];
      });
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
      if (data) res.locals.recipeId = data._id;
      return next();
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
    RETURNING *
    `;
  const params = [res.locals.recipeId];
  db.query(query, params)
    .then((data) => {
      res.locals.postgresRecipeId = data.rows[0]._id;
      return next();
    })
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

recipesController.saveUserRecipe = async (req, res, next) => {
  const queryString = `
    INSERT INTO user_recipes (user_id, recipe_id, cooked)
    VALUES ($1, $2, $3)
  `;
  const params = [req.user._id, res.locals.postgresRecipeId, false];
  db.query(queryString, params)
    .then(() => next())
    .catch((err) =>
      next({
        log: `recipesController.saveRecipePostgres: ERROR: ${err}`,
        message: {
          err:
            'recipesController.saveRecipePostgres: ERROR: Check server logs for details',
        },
      })
    );
};

recipesController.getUserRecipes = (req, res, next) => {
  const queryString = `
    SELECT b.mongo_id, a.cooked, a.recipe_id
    FROM user_recipes a
    JOIN recipes b
    ON a.recipe_id = b._id
    WHERE a.user_id = $1
  `;
  const params = [req.user._id];
  db.query(queryString, params)
    .then((data) => {
      res.locals.userRecipes = data.rows.map((ele) => {
        return {
          recipe_id: ele.recipe_id,
          mongo_id: JSON.parse(ele.mongo_id),
          cooked: ele.cooked,
        };
      });
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
  const queryString = `
    DELETE FROM user_recipes
    WHERE recipe_id = $1
    AND user_id = $2
  `;
  const params = [req.params.recipeId, req.user._id];
  db.query(queryString, params)
    .then(() => next())
    .catch(() =>
      next({
        log: `recipesController.deleteRecipe: ERROR: ${err}`,
        message: {
          err:
            'recipesController.deleteRecipe: ERROR: Check server logs for details',
        },
      })
    );
};

recipesController.markCooked = (req, res, next) => {
  const queryString = `
    UPDATE user_recipes SET cooked = true
    WHERE recipe_id = $1
    AND user_id = $2; 
  `;
  const params = [req.body.recipeId, req.user._id];
  db.query(queryString, params)
    .then(() => next())
    .catch(() =>
      next({
        log: `recipesController.markCooked: ERROR: ${err}`,
        message: {
          err:
            'recipesController.markCooked: ERROR: Check server logs for details',
        },
      })
    );
};

recipesController.markNotCooked = (req, res, next) => {
  const queryString = `
    UPDATE user_recipes SET cooked = false
    WHERE recipe_id = $1
    AND user_id = $2;
  `;
  const params = [req.body.recipeId, req.user._id];
  db.query(queryString, params)
    .then(() => next())
    .catch(() =>
      next({
        log: `recipesController.markCooked: ERROR: ${err}`,
        message: {
          err:
            'recipesController.markCooked: ERROR: Check server logs for details',
        },
      })
    );
};

module.exports = recipesController;
