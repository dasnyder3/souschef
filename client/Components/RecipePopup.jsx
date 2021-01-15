import React, { Component } from 'react';
import Ingredient from './Ingredient.jsx';
import Step from './Step.jsx';

class RecipePopup extends Component {
  constructor() {
    super();
    this.state = {
      scaler: 1
    }
    this.updateScaler = this.updateScaler.bind(this);
  }

  updateScaler(newServing, servings) {
    const newScaler = newServing / servings;
    this.setState({ scaler: newScaler });
  }

  render() {
    const { recipe, closeRecipe } = this.props;
    if (!recipe.extendedIngredients || !recipe.analyzedInstructions[0]) {
      return (
        <article className="recipe-popup" onClick={(event) => closeRecipe(event)}>
          <article className="recipe-popup-inner">
            <h2>{recipe.title}</h2>
            <h3>Recipe directions unavaible</h3>
            <a href={recipe.sourceUrl} target="_blank">View on original site</a>
          </article>
        </article>
      )
    }
    const ingredients = recipe.extendedIngredients.map((ingredient,i) => {
      return (
        <Ingredient
          key={`ingredient-${i}`}
          amount={ingredient.amount}
          unit={ingredient.unit}
          originalName={ingredient.originalName}
          servings={recipe.servings} 
          scaler={this.state.scaler}
        />)
    });
    const directions = recipe.analyzedInstructions[0].steps.map((step, i) => {
      return (
        <Step
          key={`step-${i}`}
          number={step.number}
          step={step.step}
        />
      )
    })
    return (
      <article className="recipe-popup" onClick={(event) => closeRecipe(event)}>
        <article className="recipe-popup-inner">
          <h2>{recipe.title}</h2>
          <a href={recipe.sourceUrl} target="_blank">View on original site</a>
          <p>Serves:</p>
          <input type="text" id="serves" defaultValue={recipe.servings} onChange={(e) => this.updateScaler(e.target.value, recipe.servings)}></input>
          <h3>Ingredients:</h3>
          {ingredients}
          <h3>Directions:</h3>
          {directions}
        </article>
      </article>
    )
  }
}

// const RecipePopup = ({ recipe, closeRecipe }) => {
//   if (!recipe.extendedIngredients || !recipe.analyzedInstructions[0]) {
//     return (
//       <article className="recipe-popup" onClick={(event) => closeRecipe(event)}>
//         <article className="recipe-popup-inner">
//           <h2>{recipe.title}</h2>
//           <h3>Recipe directions unavaible</h3>
//           <a href={recipe.sourceUrl} target="_blank">View on original site</a>
//         </article>
//       </article>
//     )
//   }
//   const ingredients = recipe.extendedIngredients.map((ingredient) => {
//     return (
//     <Ingredient 
//       amount={ingredient.amount} 
//       unit={ingredient.unit}
//       originalName={ingredient.originalName}
//       servings={recipe.servings}
//     />)
//   });
//   const directions = recipe.analyzedInstructions[0].steps.map((step) => {
//     return (
//       <Step
//         number={step.number}
//         step={step.step}
//       />
//     )
//   })
//   return (
//     <article className="recipe-popup" onClick={(event) => closeRecipe(event)}>
//       <article className="recipe-popup-inner">
//         <h2>{recipe.title}</h2>
//         <a href={recipe.sourceUrl} target="_blank">View on original site</a>
//         <p>Serves:</p>
//         <input type="text" id="serves" value={recipe.servings}></input>
//         <h3>Ingredients:</h3>
//         {ingredients}
//         <h3>Directions:</h3>
//         {directions}
//       </article>
//     </article>
//   )
// }

export default RecipePopup;