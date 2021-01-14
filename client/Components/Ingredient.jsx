import React, { Component } from 'react';

const Ingredient = ({ amount, unit, originalName }) => {
  console.log(amount, unit, originalName);
  return <p>{amount} {unit} {originalName}</p>
}

export default Ingredient;