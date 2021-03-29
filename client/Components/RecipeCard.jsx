import React from 'react';

const RecipeCard = ({
  recipeDetails,
  recipeId,
  cooked,
  openRecipe,
  markCooked,
  markNotCooked,
  removeRecipe,
}) => {
  return (
    <article
      className='recipe-card'
      id={recipeId}
      onClick={(event) => openRecipe(event, recipeId)}
    >
      <img src={recipeDetails.recipe.image}></img>
      <div className='recipe-details'>
        <h3>{recipeDetails.name}</h3>
        {recipeDetails.recipe.readyInMinutes ? (
          <p>Ready in {recipeDetails.recipe.readyInMinutes} minutes</p>
        ) : (
          <p>Time estimate unavailable</p>
        )}
        {!cooked ? (
          <button onClick={() => markCooked(recipeId)} className='cooked-btn'>
            Made it
          </button>
        ) : (
          <button
            onClick={() => markNotCooked(recipeId)}
            className='cooked-btn filled'
          >
            Cooked
          </button>
        )}
        <button className='remove-btn' onClick={() => removeRecipe(recipeId)}>
          Delete
        </button>
      </div>
    </article>
  );
};

export default RecipeCard;
