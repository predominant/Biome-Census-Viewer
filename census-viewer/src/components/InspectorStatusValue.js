import React from 'react';
import { Row, Col } from 'react-bootstrap';

export default function InspectorStatusValue(props) {
  const { label, value } = props;

  return (
    <Row>
      <Col sm={4} className="data-header">
        {label}
      </Col>
      <Col sm={8} className="data">
        {value ? 'true' : 'false'}
      </Col>
    </Row>
  );
};
