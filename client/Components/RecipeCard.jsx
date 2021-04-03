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
      style={{ width: '18rem' }}
    >
      <Card.Img variant='top' src={recipeDetails.recipe.image} />
      <Card.Title>{recipeDetails.name}</Card.Title>
      <Card.Text>
        {recipeDetails.recipe.readyInMinutes ? (
          <p>Ready in {recipeDetails.recipe.readyInMinutes} minutes</p>
        ) : (
          <p>Time estimate unavailable</p>
        )}
        {!cooked ? (
          <Button
            onClick={() => markCooked(recipeId)}
            className='cooked-btn'
            variant='secondary'
          >
            Made it
          </Button>
        ) : (
          <Button
            onClick={() => markNotCooked(recipeId)}
            className='cooked-btn filled'
            variant='primary'
          >
            Cooked
          </Button>
        )}
        <Button className='remove-btn' onClick={() => removeRecipe(recipeId)}>
          Delete
        </Button>
      </Card.Text>
    </Card>
  );
};

export default RecipeCard;
