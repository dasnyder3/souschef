import React from 'react';
import { fraction } from 'mathjs';

const Quantity = ({ amount, scaler }) => {
  const quantity = amount * scaler;
  const wholeNum =
    quantity >= 1 ? <span>{quantity.toFixed()}</span> : <span></span>;
  const { n, d } = fraction(quantity - quantity.toFixed());
  const frac =
    n > 0 ? (
      <span>
        <sup>{n}</sup>&frasl;<sub>{d}</sub>
      </span>
    ) : (
      <span></span>
    );
  return (
    <span>
      {wholeNum}
      {frac}
    </span>
  );
};

export default Quantity;
