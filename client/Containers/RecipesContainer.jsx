import React, { Component } from 'react';
import RecipeCard from '../Components/RecipeCard.jsx';


const RecipesContainer = ({ recipes, openRecipe }) => {
  console.log(Array.isArray(recipes));
  const recipeCards = recipes.map((recipe, i) => {
    return <RecipeCard key={`recipe-${i}`} recipe={recipe} openRecipe={openRecipe}/>
  })
  return <div>{recipeCards}</div>
}

export default RecipesContainer;