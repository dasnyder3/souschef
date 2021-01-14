import React, {Component} from 'react';
import AddRecipe from '../Components/AddRecipe.jsx'
import RecipePopup from '../Components/RecipePopup.jsx';
import RecipesContainer from './RecipesContainer.jsx';

class MainContainer extends Component {
  constructor() {
    super();
    this.state = {
      newRecipe: '',
      recipes: [],
      displayedRecipe: null,
    };
    this.updateRecipe = this.updateRecipe.bind(this);
    this.parseRecipe = this.parseRecipe.bind(this);
    this.openRecipe = this.openRecipe.bind(this);
    this.closeRecipe = this.closeRecipe.bind(this);
  }

  componentDidMount() {
    this.getRecipes();
  }

  getRecipes() {
    fetch('/recipes')
      .then(data => data.json())
      .then(data => this.setState({ recipes: [...data], newRecipe: '' }));
  }

  updateRecipe(text) {
    console.log('event.target.value', text);
    this.setState({ newRecipe: text });
  }

  parseRecipe(event) {
    const requestOptions = {
      method: 'POST', 
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: this.state.newRecipe })
    };
    fetch('recipes/parse', requestOptions)
      .then(() => this.getRecipes());
  }

  openRecipe(recipeId) {
    const recipeToShow = this.state.recipes.filter((recipe) => recipe._id === recipeId)[0];
    console.log('recipeToShow', recipeToShow);
    this.setState({ displayedRecipe: recipeToShow });
  }

  closeRecipe(event) {
    // will check if the click came from the popup itself
      // if not, close the popup; otherwise, leave it open
    if (!event.target.closest('.recipe-popup-inner')) {
      this.setState({ displayedRecipe: null });
    }
  }

  render() {
    return (
      <div>
        <AddRecipe
          newRecipe={this.state.newRecipe}
          updateRecipe={this.updateRecipe}
          parseRecipe={this.parseRecipe}
        />
        <RecipesContainer 
          recipes={this.state.recipes}
          openRecipe={this.openRecipe}
        />
        {this.state.displayedRecipe ? 
          <RecipePopup 
            recipe={this.state.displayedRecipe.recipe}
            closeRecipe={this.closeRecipe}
          />
        : null}
      </div>
    )
  }
}

export default MainContainer;