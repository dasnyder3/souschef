import React from 'react';

const AddRecipe = ({newRecipe, updateRecipe, parseRecipe}) => (
  <div>
    <h2>Add a Recipe!</h2>
    <input type="text" value={newRecipe} onChange={(event) => updateRecipe(event.target.value)}></input>
    <button onClick={parseRecipe}>Submit</button>
  </div>
)

export default AddRecipe;