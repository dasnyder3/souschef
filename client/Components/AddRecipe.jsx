import React from 'react';
import Button from 'react-bootstrap/Button';

const AddRecipe = ({ newRecipe, updateRecipe, parseRecipe }) => (
  <div className='recipe-form'>
    <h3>Add a Recipe:</h3>
    <input
      type='text'
      value={newRecipe}
      onChange={(event) => updateRecipe(event.target.value)}
    ></input>
    {/* <button onClick={parseRecipe} className='btn-primary'>
      Get Cookin'
    </button> */}
    <Button onClick={parseRecipe}>Get Cookin'</Button>
  </div>
);

export default AddRecipe;
