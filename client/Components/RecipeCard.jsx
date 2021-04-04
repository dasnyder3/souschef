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
      <Card.Title style={{ padding: '3px' }}>{recipeDetails.name}</Card.Title>
      <Card.Text style={{ padding: '3px' }}>
        {recipeDetails.recipe.readyInMinutes ? (
          <span>Ready in {recipeDetails.recipe.readyInMinutes} minutes</span>
        ) : (
          <span>Time estimate unavailable</span>
        )}
      </Card.Text>
      <Card.Footer>
        {!cooked ? (
          <Button
            onClick={() => markCooked(recipeId)}
            variant='secondary'
            style={{ width: '100%' }}
          >
            Made it
          </Button>
        ) : (
          <Button
            onClick={() => markNotCooked(recipeId)}
            variant='primary'
            style={{ width: '100%' }}
          >
            Cooked
          </Button>
        )}
      </Card.Footer>
    </Card>
  );
};

export default RecipeCard;
