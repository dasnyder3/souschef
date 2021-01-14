import React, { Component } from 'react';
import Ingredient from './Ingredient.jsx';
import Step from './Step.jsx';

const RecipePopup = ({ recipe, closeRecipe }) => {
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
    <article className="recipe-popup" onClick={(event) => closeRecipe(event)}>
      <article className="recipe-popup-inner">
        <h2>{recipe.title}</h2>
        <a href={recipe.sourceUrl} target="_blank">View on original site</a>
        <h3>Ingredients:</h3>
        {ingredients}
        <h3>Directions:</h3>
        {directions}
      </article>
    </article>
  )
}

export default RecipePopup;