import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/Spinner';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';

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
      <Form.Row>
        <Col xs={10}>
          <Form.Control
            type='text'
            value={newRecipe}
            onChange={(event) => updateRecipe(event.target.value)}
            placeholder='Recipe URL'
            // column
            // lg={2}
          ></Form.Control>
        </Col>
        <Col>
          {loadingButton ? (
            <Button disabled>
              <Spinner as='span' animation='border' size='sm' />{' '}
              <span>Loading...</span>
            </Button>
          ) : (
            <Button onClick={parseRecipe}>Save</Button>
          )}
        </Col>
      </Form.Row>
    </Modal.Body>
  </Modal>
);

export default AddRecipe;
