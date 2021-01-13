import React, {Component} from 'react';
import AddRecipe from '../Components/AddRecipe.jsx'

class MainContainer extends Component {
  constructor() {
    super();
    this.state = {
      newRecipe: '',
      recipes: [],
    };
    this.updateRecipe = this.updateRecipe.bind(this);
    this.parseRecipe = this.parseRecipe.bind(this);
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
      .then(response => response.json())
      .then(data => {
        console.log(data);
        const newRecipes = this.state.recipes.slice();
        newRecipes.push(data);
        this.setState({ recipes: newRecipes });
      })
  }

  render() {
    return (
      <AddRecipe 
        newRecipe={this.state.newRecipe}
        updateRecipe={this.updateRecipe}
        parseRecipe={this.parseRecipe}
      />
    )
  }
}

export default MainContainer;