import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const AddRecipe = ({
  newRecipe,
  updateRecipe,
  parseRecipe,
  toggleRecipePopup,
  addRecipePopup,
}) => (
  <Modal show={addRecipePopup} onHide={toggleRecipePopup}>
    <h3>Add a Recipe:</h3>
    <Modal.Header>
      <Modal.Title>Add a Recipe:</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <input
        type='text'
        value={newRecipe}
        onChange={(event) => updateRecipe(event.target.value)}
      ></input>
      <Button onClick={parseRecipe}>Get Cookin'</Button>
    </Modal.Body>
  </Modal>
);

export default AddRecipe;
