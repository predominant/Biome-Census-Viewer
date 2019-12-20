import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import InspectorValue from './InspectorValue';

export default function InspectorService(props) {
  const { service } = props;

  return (
    <Container className="inspector">
      <Row className="header">
        <Col>
          Service
        </Col>
      </Row>
      <InspectorValue label="Group" value={service.group} />
      <InspectorValue label="Service" value={service.service} />
      <InspectorValue label="Application" value={service.application} />
      <InspectorValue label="Environment" value={service.environment} />
    </Container>
  );
};
