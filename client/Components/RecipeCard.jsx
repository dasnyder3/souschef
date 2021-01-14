import React from 'react';

const RecipeCard = ({recipe, openRecipe}) => {
  return (
    <article className="recipe-card" id={recipe._id} onClick={() => openRecipe(recipe._id)}>
      <img src={recipe.recipe.image}></img>
      <div>
        <h3>{recipe.name}</h3>
        <p>Ready in {recipe.recipe.readyInMinutes} minutes</p>
      </div>
    </article>
  )
}

export default RecipeCard;