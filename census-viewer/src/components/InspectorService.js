import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import InspectorValue from './InspectorValue';

export default function InspectorService(props) {
  const { service } = props;

  const applicationClass = service.application === null ? 'null' : '';
  const environmentClass = service.environment === null ? 'null' : '';

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
