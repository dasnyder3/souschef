import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Step = ({ number, step }) => {
  return (
    <Row style={{ padding: '6px' }}>
      <Col>{number}.</Col> <Col xs={11}>{step}</Col>
    </Row>
  );
};

export default Step;
