import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import InspectorService from './InspectorService';
import InspectorPackage from './InspectorPackage';
import InspectorStatus from './InspectorStatus';
import InspectorSystem from './InspectorSystem';

export default function MemberInspector(props) {
  const { member } = props;

  return (
    <Container fluid className="inspector">
      <Row>
        <Col sm={6}>
          <InspectorPackage pkg={member.pkg} />
        </Col>
        <Col sm={6}>
          <InspectorService service={{
            group: member.group,
            service: member.service,
            application: member.application,
            environment: member.environment,
          }} />
        </Col>
      </Row>
      <Row>
        <Col sm={6}>
          <InspectorStatus status={{
            alive: member.alive,
            suspect: member.suspect,
            confirmed: member.confirmed,
            departed: member.departed,
          }} />
        </Col>
        <Col sm={6}>
          <InspectorSystem sys={member.sys} />
        </Col>
      </Row>
    </Container>
  )
};
