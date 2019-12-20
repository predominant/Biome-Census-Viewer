import React from 'react';
import { Row, Col } from 'react-bootstrap';

export default function MemberHeader(props) {
  const { member } = props;

  return (
    <Row>
      <Col className="member-header">
        <span className="service-group">{member.service}.{member.group}</span>
        {' '}
        <span className="on">on</span>
        {' '}
        <span className="hostname">{member.sys.hostname}</span>
        {' '}
        ({member.sys.ip})
      </Col>
    </Row>
  );
};
