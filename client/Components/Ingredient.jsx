import React, { Component } from 'react';

const Ingredient = ({ amount, unit, originalName, scaler }) => {
  return <p>{scaler * amount} {unit} {originalName}</p>
}

export default Ingredient;