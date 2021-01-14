import React, { Component } from 'react';
import RecipeCard from '../Components/RecipeCard.jsx';


const RecipesContainer = ({ recipes, openRecipe, markCooked }) => {
  const recipeCards = recipes.map((recipe, i) => {
    return (
      <RecipeCard 
        key={`recipe-${i}`} 
        recipe={recipe.details} 
        cooked={recipe.cooked}
        openRecipe={openRecipe}
        markCooked={markCooked}
      />)
  })
  return <div>{recipeCards}</div>
}

export default RecipesContainer;