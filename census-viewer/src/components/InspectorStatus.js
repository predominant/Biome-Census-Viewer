import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import InspectorStatusValue from './InspectorStatusValue';

export default function InspectorStatus(props) {
  const { status } = props;

  return (
    <Container className="inspector">
      <Row className="header">
        <Col>
          Status
        </Col>
      </Row>
      <InspectorStatusValue
        label="Alive"
        value={status.alive} />
      <InspectorStatusValue
        label="Suspect"
        value={status.suspect} />
      <InspectorStatusValue
        label="Confirmed"
        value={status.confirmed} />
      <InspectorStatusValue
        label="Departed"
        value={status.departed} />
    </Container>
  );
};
