import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Quantity from './Quantity';

const Ingredient = ({ amount, unit, originalName, scaler }) => {
  return (
    <div>
      <Row>
        <Col>
          {/* {(amount * scaler).toFixed(2)} */}
          <Quantity amount={amount} scaler={scaler} />
        </Col>
        <Col xs={3}>{unit}</Col>
        <Col xs={8}>{originalName}</Col>
      </Row>
      <hr />
    </div>
  );
};

export default Ingredient;
