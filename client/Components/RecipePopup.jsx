import React, { Component } from 'react';
import Ingredient from './Ingredient.jsx';
import Step from './Step.jsx';

const RecipePopup = ({ recipe }) => {
  // console.log('RecipePopup', recipe);
  const ingredients = recipe.extendedIngredients.map((ingredient) => {
    return (
    <Ingredient 
      amount={ingredient.amount} 
      unit={ingredient.unit}
      originalName={ingredient.originalName}
    />)
  });
  const directions = recipe.analyzedInstructions[0].steps.map((step) => {
    return (
      <Step
        number={step.number}
        step={step.step}
      />
    )
  })
  return (
    <article>
      <h3>Ingredients:</h3>
      {ingredients}
      <h3>Directions:</h3>
      {directions}
    </article>
  )
}

export default RecipePopup;