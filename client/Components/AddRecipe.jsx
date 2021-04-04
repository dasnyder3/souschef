import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/Spinner';

const AddRecipe = ({
  newRecipe,
  updateRecipe,
  parseRecipe,
  toggleRecipePopup,
  addRecipePopup,
  loadingButton,
}) => (
  <Modal show={addRecipePopup} onHide={toggleRecipePopup}>
    <Modal.Header>
      <Modal.Title>Add a Recipe:</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <input
        type='text'
        value={newRecipe}
        onChange={(event) => updateRecipe(event.target.value)}
      ></input>
      {loadingButton ? (
        <Button disabled>
          <Spinner as='span' animation='border' size='sm' />{' '}
          <span>Loading...</span>
        </Button>
      ) : (
        <Button onClick={parseRecipe}>Get Cookin'</Button>
      )}
    </Modal.Body>
  </Modal>
);

export default AddRecipe;
