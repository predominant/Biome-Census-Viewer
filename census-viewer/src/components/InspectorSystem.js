import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import InspectorValue from './InspectorValue';

export default function InspectorSystem(props) {
  const { sys } = props;

  return (
    <Container className="inspector">
      <Row className="header">
        <Col>
          System
        </Col>
      </Row>
      <InspectorValue label="Hostname" value={sys.hostname} />
      <InspectorValue label="IP Address" value={sys.ip} />
      <InspectorValue label="Gossip IP" value={sys.gossip_ip} />
      <InspectorValue label="Gossip Port" value={sys.gossip_port} />
    </Container>
  );
};
