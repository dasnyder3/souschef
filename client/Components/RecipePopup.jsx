import React, { Component, useState } from 'react';
import Ingredient from './Ingredient.jsx';
import Step from './Step.jsx';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const RecipePopup = ({
  recipe,
  closeRecipe,
  openRecipe,
  showRecipe,
  removeRecipe,
  recipeId,
}) => {
  const [scaler, updateScaler] = useState(1);

  const setScaler = (newServing, servings) => {
    updateScaler(newServing / servings);
  };

  if (!recipe.extendedIngredients || !recipe.analyzedInstructions[0]) {
    return (
      <article className='recipe-popup' onClick={(event) => closeRecipe(event)}>
        <article className='recipe-popup-inner'>
          <h2>{recipe.title}</h2>
          <h3>Recipe directions unavaible</h3>
          <a href={recipe.sourceUrl} target='_blank'>
            View on original site
          </a>
        </article>
      </article>
    );
  }
  const ingredients = recipe.extendedIngredients.map((ingredient, i) => {
    return (
      <Ingredient
        key={`ingredient-${i}`}
        amount={ingredient.amount}
        unit={ingredient.unit}
        originalName={ingredient.originalName}
        servings={recipe.servings}
        scaler={scaler}
      />
    );
  });
  const directions = recipe.analyzedInstructions[0].steps.map((step, i) => {
    return <Step key={`step-${i}`} number={step.number} step={step.step} />;
  });
  return (
    <Modal show={showRecipe} onHide={closeRecipe} size='lg'>
      <Modal.Header>
        <Modal.Title>{recipe.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <a href={recipe.sourceUrl} target='_blank'>
          View on original site
        </a>
        <span>Serves:</span>
        <input
          type='text'
          id='serves'
          defaultValue={recipe.servings}
          onChange={(e) => updateScaler(e.target.value, recipe.servings)}
        ></input>
        <span>Ingredients:</span>
        {ingredients}
        <span>Directions:</span>
        {directions}
      </Modal.Body>
      <Modal.Footer>
        <Button variant='primary' onClick={closeRecipe}>
          Close
        </Button>
        <Button id={recipeId} onClick={removeRecipe}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RecipePopup;
