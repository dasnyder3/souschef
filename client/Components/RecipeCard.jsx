import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

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
    <Card
      onClick={(event) => openRecipe(event, recipeId)}
      style={{ width: '17rem' }}
    >
      <Card.Img variant='top' src={recipeDetails.recipe.image} />
      <Card.Title>{recipeDetails.name}</Card.Title>
      <Card.Text>
        {recipeDetails.recipe.readyInMinutes ? (
          <span>Ready in {recipeDetails.recipe.readyInMinutes} minutes</span>
        ) : (
          <span>Time estimate unavailable</span>
        )}
      </Card.Text>
      <Card.Footer>
        {!cooked ? (
          <Button onClick={() => markCooked(recipeId)} variant='secondary'>
            Made it
          </Button>
        ) : (
          <Button onClick={() => markNotCooked(recipeId)} variant='primary'>
            Cooked
          </Button>
        )}
      </Card.Footer>
    </Card>
  );
};

export default RecipeCard;
