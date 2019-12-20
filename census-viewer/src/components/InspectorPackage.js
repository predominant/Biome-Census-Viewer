import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import InspectorValue from './InspectorValue';

export default function InspectorPackage(props) {
  const { pkg } = props;

  return (
    <Container className="inspector">
      <Row className="header">
        <Col>
          Package
        </Col>
      </Row>
      <InspectorValue label="Origin" value={pkg.origin} />
      <InspectorValue label="Package" value={pkg.name} />
      <InspectorValue label="Version" value={pkg.version} />
      <InspectorValue label="Release" value={pkg.release} />
    </Container>
  );
};
