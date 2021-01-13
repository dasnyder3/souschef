import React from 'react';

const AddRecipe = ({newRecipe, updateRecipe, parseRecipe}) => (
  <div>
    <h3>Add a Recipe!</h3>
    <input type="text" defaultValue={newRecipe} onChange={(event) => updateRecipe(event.target.value)}></input>
    <button onClick={parseRecipe}>Submit</button>
  </div>
)

export default AddRecipe;