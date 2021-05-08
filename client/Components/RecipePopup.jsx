import React, { Component, useState } from 'react';
import Ingredient from './Ingredient.jsx';
import Step from './Step.jsx';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';

const RecipePopup = ({
  recipe,
  closeRecipe,
  openRecipe,
  showRecipe,
  removeRecipe,
  recipeId,
  savedRecipeId,
}) => {
  const [scaler, updateScaler] = useState(1);

  const setScaler = (newServing, servings) => {
    updateScaler(newServing / servings);
  };

  const [comment, updateComment] = useState('');

  const changeComment = (event) => updateComment(event.target.value);

  const submitComment = () => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        saved_recipe_id: savedRecipeId,
        comment,
      }),
    };
    fetch('/recipes/comment', requestOptions)
      .then((res) => res.json())
      .then((data) => console.log(data));
    updateComment('');
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
        <a href={recipe.sourceUrl} target='_blank'>
          View on original site
        </a>
      </Modal.Header>
      <Modal.Body>
        <Image src={recipe.image} fluid></Image>
        <Form.Row style={{ padding: '6px' }}>
          <Form.Label column lg={1}>
            Serves:
          </Form.Label>
          <Form.Control
            type='text'
            defaultValue={recipe.servings}
            onChange={(e) => updateScaler(e.target.value, recipe.servings)}
            style={{ width: '50px' }}
          ></Form.Control>
        </Form.Row>
        <h3>Ingredients:</h3>
        <Container>{ingredients}</Container>
        <h3>Directions:</h3>
        <Container>{directions}</Container>
        {/* <Form>
          <Form.Control type='text' value={comment} onChange={changeComment} />
          <Button onClick={submitComment}>Submit</Button>
        </Form> */}
      </Modal.Body>
      <Modal.Footer>
        <Container>
          <Row>
            <Col md={4}>
              <Button variant='danger' id={recipeId} onClick={removeRecipe}>
                Delete
              </Button>
            </Col>
            <Col>
              <Button
                variant='primary'
                onClick={closeRecipe}
                className='float-right'
              >
                Close
              </Button>
            </Col>
          </Row>
        </Container>
      </Modal.Footer>
    </Modal>
  );
};

export default RecipePopup;
