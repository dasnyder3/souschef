const mongoose = require('mongoose');

const MONGO_URI = 'mongodb+srv://dasnyder:QU2BVn0ON1N5lj26@cluster0.olrl6.mongodb.net/souschef?retryWrites=true&w=majority';

mongoose.connect(MONGO_URI, {
  // options for the connect method to parse the URI
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // sets the name of the DB that our collections are part of
  dbName: 'souschef'
})
  .then(() => console.log('Connected to Mongo DB.'))
  .catch(err => console.log(err));

const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  name: String,
  url: String,
  recipe: {
    vegetarian: {
      type: Boolean
    },
    vegan: {
      type: Boolean
    },
    glutenFree: {
      type: Boolean
    },
    dairyFree: {
      type: Boolean
    },
    veryHealthy: {
      type: Boolean
    },
    cheap: {
      type: Boolean
    },
    veryPopular: {
      type: Boolean
    },
    sustainable: {
      type: Boolean
    },
    weightWatcherSmartPoints: {
      type: Number
    },
    gaps: {
      type: String
    },
    lowFodmap: {
      type: Boolean
    },
    preparationMinutes: {
      type: Number
    },
    cookingMinutes: {
      type: Number
    },
    aggregateLikes: {
      type: Number
    },
    spoonacularScore: {
      type: Number
    },
    healthScore: {
      type: Number
    },
    pricePerServing: {
      type: Number
    },
    extendedIngredients: {
      type: [
        {}
      ]
    },
    id: {
      type: Number
    },
    title: {
      type: String
    },
    readyInMinutes: {
      type: Number
    },
    servings: {
      type: Number
    },
    sourceUrl: {
      type: String
    },
    image: {
      type: String
    },
    imageType: {
      type: String
    },
    summary: {
      type: {}
    },
    cuisines: {
      type: Array
    },
    dishTypes: {
      type: Array
    },
    diets: {
      type: Array
    },
    occasions: {
      type: Array
    },
    instructions: {
      type: String
    },
    analyzedInstructions: {
      type: [
        {}
      ]
    },
    sourceName: {
      type: {}
    },
    creditsText: {
      type: {}
    },
    originalId: {
      type: {}
    }
  }
});

const Recipes = mongoose.model('recipe', recipeSchema);

const savedRecipeSchema = new Schema({
  userId: {
    type: String,
    required: true
  },
  recipes: [{
    recipeId: {
      type: Schema.Types.ObjectId,
      ref: 'recipe'
    },
    cooked: {
      type: Boolean,
      default: false
    },
    notes: [{
      date: {
        type: Date,
        default: Date.now
      },
      note: String
    }]
  }]
});

const SavedRecipes = mongoose.model('savedRecipe', savedRecipeSchema);

module.exports = {
  Recipes,
  SavedRecipes,
}