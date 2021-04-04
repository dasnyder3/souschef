import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Ingredient = ({ amount, unit, originalName, scaler }) => {
  return (
    <div>
      <Row>
        <Col>{scaler * amount}</Col> <Col xs={3}>{unit}</Col>
        <Col xs={8}>{originalName}</Col>
      </Row>
      <hr />
    </div>
  );
};

export default Ingredient;
