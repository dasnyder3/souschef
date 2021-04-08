import React, { Component } from 'react';
import AddRecipe from '../Components/AddRecipe.jsx';
import RecipePopup from '../Components/RecipePopup.jsx';
import RecipesContainer from './RecipesContainer.jsx';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class MainContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newRecipe: '',
      recipes: [],
      displayedRecipe: null,
      showRecipe: false,
      addRecipePopup: false,
      loadingButton: false,
    };
    this.updateRecipe = this.updateRecipe.bind(this);
    this.parseRecipe = this.parseRecipe.bind(this);
    this.openRecipe = this.openRecipe.bind(this);
    this.closeRecipe = this.closeRecipe.bind(this);
    this.markCooked = this.markCooked.bind(this);
    this.markNotCooked = this.markNotCooked.bind(this);
    this.removeRecipe = this.removeRecipe.bind(this);
    this.toggleRecipePopup = this.toggleRecipePopup.bind(this);
  }

  componentDidMount() {
    console.log(this.props.person);
    this.getRecipes();
  }

  getRecipes() {
    fetch('/recipes')
      .then((data) => data.json())
      .then((data) => this.setState({ recipes: [...data], newRecipe: '' }));
  }

  updateRecipe(text) {
    this.setState({ newRecipe: text });
  }

  parseRecipe(event) {
    this.setState({ loadingButton: true });
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: this.state.newRecipe }),
    };
    fetch('recipes/parse', requestOptions)
      .then(() => {
        this.getRecipes();
        this.toggleRecipePopup();
      })
      .catch((err) => console.log(err));
  }

  markCooked(recipeId) {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ recipeId: recipeId }),
    };
    fetch('recipes/cooked', requestOptions)
      .then(() => this.getRecipes())
      .catch((err) => console.log(err));
  }

  markNotCooked(recipeId) {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ recipeId: recipeId }),
    };
    fetch('recipes/notcooked', requestOptions)
      .then(() => this.getRecipes())
      .catch((err) => console.log(err));
  }

  removeRecipe(e) {
    const requestOptions = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    };
    fetch(`recipes/${e.target.id}`, requestOptions)
      .then(() => {
        this.closeRecipe();
        this.getRecipes();
      })
      .catch((err) => console.log(err));
  }

  openRecipe(event, recipeId) {
    console.log(event.target.className);
    if (
      event.target.className !== 'btn btn-primary' &&
      event.target.className !== 'btn btn-outline-primary'
    ) {
      const recipeToShow = this.state.recipes.filter(
        (recipe) => recipe.recipe_id === recipeId
      )[0];
      this.setState({ displayedRecipe: recipeToShow, showRecipe: true });
    }
  }

  closeRecipe(event) {
    this.setState({ displayedRecipe: null, showRecipe: false });
  }

  toggleRecipePopup() {
    this.setState({
      addRecipePopup: !this.state.addRecipePopup,
      loadingButton: false,
    });
  }

  render() {
    const { user } = this.props;
    console.log(user);
    return (
      <Container fluid>
        <Container style={{ padding: '5px' }} fluid>
          <Row>
            <Col md={4}>
              <h3>Bon Appetit, {user.given_name}</h3>
            </Col>
            <Col md={{ span: 4, offset: 4 }}>
              <Button
                as='span'
                onClick={this.toggleRecipePopup}
                className='float-right'
              >
                Add Recipe
              </Button>
            </Col>
          </Row>
        </Container>
        <AddRecipe
          newRecipe={this.state.newRecipe}
          updateRecipe={this.updateRecipe}
          parseRecipe={this.parseRecipe}
          toggleRecipePopup={this.toggleRecipePopup}
          addRecipePopup={this.state.addRecipePopup}
          loadingButton={this.state.loadingButton}
        />
        <RecipesContainer
          recipes={this.state.recipes}
          openRecipe={this.openRecipe}
          markCooked={this.markCooked}
          markNotCooked={this.markNotCooked}
          removeRecipe={this.removeRecipe}
        />
        {this.state.showRecipe ? (
          <RecipePopup
            openRecipe={this.openRecipe}
            recipeId={this.state.displayedRecipe.recipe_id}
            recipe={this.state.displayedRecipe.recipeDetails.recipe}
            closeRecipe={this.closeRecipe}
            showRecipe={this.state.showRecipe}
            removeRecipe={this.removeRecipe}
          />
        ) : null}
      </Container>
    );
  }
}

export default MainContainer;
