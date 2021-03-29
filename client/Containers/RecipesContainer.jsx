import React, { Component } from 'react';
import RecipeCard from '../Components/RecipeCard.jsx';

const RecipesContainer = ({
  recipes,
  openRecipe,
  markCooked,
  markNotCooked,
  removeRecipe,
}) => {
  const recipeCards = recipes.map((recipe, i) => {
    return (
      <div className='container'>
        <RecipeCard
          key={`recipe-${i}`}
          recipeId={recipe.recipe_id}
          recipeDetails={recipe.recipeDetails}
          cooked={recipe.cooked}
          openRecipe={openRecipe}
          markCooked={markCooked}
          markNotCooked={markNotCooked}
          removeRecipe={removeRecipe}
        />
      </div>
    );
  });
  return <div className='recipes-container'>{recipeCards}</div>;
};

export default RecipesContainer;
