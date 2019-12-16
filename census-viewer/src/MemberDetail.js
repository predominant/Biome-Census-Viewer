import React, { useState } from 'react';
import { Container, Row, Col }  from 'react-bootstrap';
import "./MemberDetail.css";

export default function MemberDetail(props) {
  const [data, setData] = useState(null);

  if (!data || data.sys === undefined)
    return <div/>;

  return (
    <div className="MemberDetail">
      <h3>{this.props.name}&nbsp;</h3>
      <div className="MemberDetail-content">
        <Container fluid={true}>
          <Row>
            <Col>
              <Container fluid={true}>
                <Row>
                  <Col md={4} className="heading">alive</Col>
                  <Col md={8} className="value">{data.alive ? "True" : "False"}</Col>
                </Row>
                <Row>
                  <Col md={4} className="heading">suspect</Col>
                  <Col md={8} className="value">{data.suspect ? "True" : "False"}</Col>
                </Row>
                <Row>
                  <Col md={4} className="heading">confirmed</Col>
                  <Col md={8} className="value">{data.confirmed ? "True" : "False"}</Col>
                </Row>
                <Row>
                  <Col md={4} className="heading">departed</Col>
                  <Col md={8} className="value">{data.departed ? "True" : "False"}</Col>
                </Row>
              </Container>
            </Col>
            <Col>
              <Container fluid={true}>
                <Row>
                  <Col md={4} className="heading">hostname</Col>
                  <Col md={8} className="value">{data.sys.hostname}</Col>
                </Row>
                <Row>
                  <Col md={4} className="heading">ip</Col>
                  <Col md={8} className="value">{data.sys.ip}</Col>
                </Row>
                <Row>
                  <Col md={4} className="heading">gossip ip</Col>
                  <Col md={8} className="value">{data.sys.gossip_ip}</Col>
                </Row>
                <Row>
                  <Col md={4} className="heading">gossip port</Col>
                  <Col md={8} className="value">{data.sys.gossip_port}</Col>
                </Row>
              </Container>
            </Col>
          </Row>
          <Row>
            <Col>
              <Container fluid={true}>
                <h3>Package</h3>
                <Row>
                  <Col md={4} className="heading">origin</Col>
                  <Col md={8} className="value">{data.pkg.origin}</Col>
                </Row>
                <Row>
                  <Col md={4} className="heading">package</Col>
                  <Col md={8} className="value">{data.pkg.name}</Col>
                </Row>
                <Row>
                  <Col md={4} className="heading">version</Col>
                  <Col md={8} className="value">{data.pkg.version}</Col>
                </Row>
                <Row>
                  <Col md={4} className="heading">release</Col>
                  <Col md={8} className="value">{data.pkg.release}</Col>
                </Row>
              </Container>
            </Col>
            <Col>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};
