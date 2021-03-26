import React, { Component } from 'react';
import AddRecipe from '../Components/AddRecipe.jsx';
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
    this.markCooked = this.markCooked.bind(this);
    this.markNotCooked = this.markNotCooked.bind(this);
    this.removeRecipe = this.removeRecipe.bind(this);
  }

  componentDidMount() {
    this.getRecipes();
  }

  getRecipes() {
    fetch('/recipes/user1')
      .then((data) => data.json())
      .then((data) => this.setState({ recipes: [...data], newRecipe: '' }));
  }

  updateRecipe(text) {
    this.setState({ newRecipe: text });
  }

  parseRecipe(event) {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: this.state.newRecipe }),
    };
    fetch('recipes/parse', requestOptions)
      .then(() => this.getRecipes())
      .catch((err) => console.log(err));
  }

  markCooked(recipeId) {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ recipeId: recipeId }),
    };
    fetch('recipes/cooked/user1', requestOptions)
      .then(() => this.getRecipes())
      .catch((err) => console.log(err));
  }

  markNotCooked(recipeId) {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ recipeId: recipeId }),
    };
    fetch('recipes/notcooked/user1', requestOptions)
      .then(() => this.getRecipes())
      .catch((err) => console.log(err));
  }

  removeRecipe(recipeId) {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ recipeId: recipeId }),
    };
    fetch('recipes/delete/user1', requestOptions)
      .then(() => this.getRecipes())
      .catch((err) => console.log(err));
  }

  openRecipe(event, recipeId) {
    if (
      event.target.className !== 'cooked-btn' &&
      event.target.className !== 'cooked-btn filled' &&
      event.target.className !== 'remove-btn'
    ) {
      const recipeToShow = this.state.recipes.filter(
        (recipe) => recipe.details._id === recipeId
      )[0];
      console.log(recipeToShow);
      this.setState({ displayedRecipe: recipeToShow });
    }
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
        <header className='header-container'>
          <h1>Sous-chef</h1>
          <AddRecipe
            newRecipe={this.state.newRecipe}
            updateRecipe={this.updateRecipe}
            parseRecipe={this.parseRecipe}
          />
        </header>
        <RecipesContainer
          recipes={this.state.recipes}
          openRecipe={this.openRecipe}
          markCooked={this.markCooked}
          markNotCooked={this.markNotCooked}
          removeRecipe={this.removeRecipe}
        />
        {this.state.displayedRecipe ? (
          <RecipePopup
            recipe={this.state.displayedRecipe.details.recipe}
            closeRecipe={this.closeRecipe}
          />
        ) : null}
      </div>
    );
  }
}

export default MainContainer;
