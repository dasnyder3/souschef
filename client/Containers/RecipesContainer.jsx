import React, { Component } from 'react';
import RecipeCard from '../Components/RecipeCard.jsx';
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';
import CardGroup from 'react-bootstrap/CardGroup';
import Button from 'react-bootstrap/Button';

const RecipesContainer = ({
  recipes,
  openRecipe,
  markCooked,
  markNotCooked,
  removeRecipe,
}) => {
  const recipeCards = recipes.map((recipe, i) => {
    // return (
    //   <div className='container'>
    //     <RecipeCard
    //       key={`recipe-${i}`}
    //       recipeId={recipe.recipe_id}
    //       recipeDetails={recipe.recipeDetails}
    //       cooked={recipe.cooked}
    //       openRecipe={openRecipe}
    //       markCooked={markCooked}
    //       markNotCooked={markNotCooked}
    //       removeRecipe={removeRecipe}
    //     />
    //   </div>
    // )
    return (
      <Card
        onClick={(event) => openRecipe(event, recipe.recipe_id)}
        style={{ width: '18rem' }}
      >
        <Card.Img variant='top' src={recipe.recipeDetails.recipe.image} />
        <Card.Title>{recipe.recipeDetails.name}</Card.Title>
        <Card.Text>
          {recipe.recipeDetails.recipe.readyInMinutes ? (
            <p>Ready in {recipe.recipeDetails.recipe.readyInMinutes} minutes</p>
          ) : (
            <p>Time estimate unavailable</p>
          )}
          {!recipe.cooked ? (
            <Button
              onClick={() => markCooked(recipe.recipe_id)}
              variant='secondary'
            >
              Made it
            </Button>
          ) : (
            <Button
              onClick={() => markNotCooked(recipe.recipe_id)}
              variant='primary'
            >
              Cooked
            </Button>
          )}
          <Button onClick={() => removeRecipe(recipe.recipe_id)}>Delete</Button>
        </Card.Text>
      </Card>
    );
  });
  return (
    <div className='recipes-container'>
      <CardDeck>{recipeCards}</CardDeck>
    </div>
  );
};

export default RecipesContainer;
