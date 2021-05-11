import React from 'react';

const Quantity = ({ numerator, denominator }) => {
  return (
    <span>
      {numerator}/{denominator}
    </span>
  );
};

export default Quantity;
