import React from 'react';
import { Row, Col } from 'react-bootstrap';

export default function InspectorValue(props) {
  const { label, value } = props;

  const dataClass = ['data'];
  if (value === undefined || value === null)
    dataClass.push('null');

  return (
    <Row>
      <Col sm={4} className="data-header">
        {label}
      </Col>
      <Col sm={8} className={dataClass}>
        {value || 'null'}
      </Col>
    </Row>
  );
};