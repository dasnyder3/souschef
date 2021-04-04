import React, { Component } from 'react';
import RecipeCard from '../Components/RecipeCard.jsx';
import CardDeck from 'react-bootstrap/CardDeck';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const RecipesContainer = ({
  recipes,
  openRecipe,
  markCooked,
  markNotCooked,
  removeRecipe,
}) => {
  const recipeCards = recipes.map((recipe, i) => {
    return (
      <Row style={{ padding: '5px' }}>
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
      </Row>
    );
  });
  return <CardDeck>{recipeCards}</CardDeck>;
};

export default RecipesContainer;
