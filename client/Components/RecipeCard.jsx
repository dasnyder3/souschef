import React from 'react';

const RecipeCard = ({recipe, cooked, openRecipe, markCooked, markNotCooked, removeRecipe }) => {
  return (
    <article className="recipe-card" id={recipe._id} onClick={(event) => openRecipe(event, recipe._id)}>
      <img src={recipe.recipe.image}></img>
      <div className="recipe-details">
        <h3>{recipe.name}</h3>
        {(recipe.recipe.readyInMinutes) ? 
          <p>Ready in {recipe.recipe.readyInMinutes} minutes</p>
          : <p>Time estimate unavailable</p>
        }
        {!cooked ? <button onClick={() => markCooked(recipe._id)} className="cooked-btn">Made it</button>
          : <button onClick={() => markNotCooked(recipe._id)} className="cooked-btn filled">Cooked</button>}
        <button className="remove-btn" onClick={() => removeRecipe(recipe._id)}>Delete</button>
      </div>
      
    </article>
  )
}

export default RecipeCard;