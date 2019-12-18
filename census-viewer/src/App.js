import React, { useState, useEffect } from 'react';
import useInterval from './hooks/useInterval';

import { Container, Row, Col, ListGroup, ListGroupItem, Navbar, Nav, FormControl, Form, Button, Tab } from 'react-bootstrap';

import logo from './biome-logo.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import PollError from './components/PollError';

export default function App(props) {
  const [endpoint, setEndpoint] = useState('http://localhost:5555/census');
  const [data, setData] = useState(null);
  const [delay, setDelay] = useState(3000);
  const [pollError, setPollError] = useState(null);
  const [activeServiceGroup, setActiveServiceGroup] = useState(null);

  const [serviceGroups, setServiceGroups] = useState([]); // All service groups.
  const [services, setServices] = useState({}); // All services, grouped by service group.
  const [members, setMembers] = useState({});

  function handlePollResponse(result) {
    setPollError(false);
    setData(result);

    if (result === null || !result.hasOwnProperty('census_groups')) {
      setPollError(true);
      return;
    }

    // Parse out the service members
    let newMembers = {};
    Object.keys(result.census_groups).map(i => {
        newMembers[i] = result.census_groups[i].population;
    });
    setMembers(newMembers);

    // Parse out the services
    let newServices = {};
    Object.keys(result.census_groups).map(i => {
      let [srv, grp] = i.split('.');
      if (!newServices.hasOwnProperty(grp))
        newServices[grp] = new Set();
      newServices[grp].add(srv);
    });
    // Convert the sets back to arrays.
    for (const key of Object.keys(newServices))
      newServices[key] = [...newServices[key]].sort();
    setServices(newServices);
    //console.table(newServices);

    // Parse out the service groups
    let newServiceGroups = [...new Set(Object.keys(result.census_groups).map(i => i.split('.')[1]))].sort();
    if (JSON.stringify(newServiceGroups) !== JSON.stringify(serviceGroups)) {
      setServiceGroups(newServiceGroups);
      //console.table(newServiceGroups);
    }
  }

  function handlePollError(err) {
    setPollError(err);
  }

  function pollEndpoint() {
    fetch(endpoint)
      .then(result => result.json())
      .then(result => handlePollResponse(result))
      .catch(err => handlePollError(err));
  }

  useInterval(async () => {
    await pollEndpoint();
  }, delay);

  function handleServiceGroupChange(name) {
    setActiveServiceGroup(name);
  }

  return (
    <div>
    <Navbar className="justify-content-between" bg="dark" variant="dark">
      <Navbar.Brand href="#home">
        <img src={logo} className="App-logo" alt="logo" className="align-top" height="30" width="30"/>
        &nbsp;&nbsp;Biome Viewer
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav"/>
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#home">Census</Nav.Link>
        </Nav>
      </Navbar.Collapse>
      <Form inline>
        <FormControl id="endpoint" type="text" defaultValue={endpoint} className="mr-sm-2"/>
        <Button onClick={() => setEndpoint(document.getElementById('endpoint').value)}>Update</Button>
      </Form>
    </Navbar>
    <Container>
      <Row>
        <Col>
          <p>{data ? 'Data' : 'Attempting to load data'}</p>
          {pollError ? <PollError err={pollError} /> : ''}
        </Col>
      </Row>
    </Container>
    <Tab.Container fluid={true} className="service-navigator">
      <Row>
        <Col>
          <h4>Service Groups</h4>
          <ListGroup>
            {serviceGroups.map((name, i) => (
              <ListGroup.Item
                key={i}
                action
                href={`#serviceGroup-${name}`}
                // onClick={() => {setActiveServiceGroup(name)}}
                >
                {name}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
        <Col>
          <h4>Services</h4>
          <Tab.Content>
            {serviceGroups.map((name, i) => (
              <Tab.Pane key={i} eventKey={`#serviceGroup-${name}`}>
                <ListGroup>
                  {services[name].map((srvName, j) => (
                    <ListGroup.Item
                      key={j}
                      action
                      href={`#serviceGroupMember-${srvName}.${name}`}>
                      {srvName}
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Tab.Pane>
            ))}
          </Tab.Content>
        </Col>
        <Col>
          <h4>Members</h4>
          <Tab.Content>
            {Object.keys(members).map((srvGroupName, k) => (
              <Tab.Pane key={k} eventKey={`#serviceGroupMember-${srvGroupName}`}>
                <ListGroup>
                  {srvGroupName}
                  {/* {
                    members[srvGroupName].map((memberName, l) => (
                    <ListGroup.Item></ListGroup.Item>
                  ))} */}
                </ListGroup>
              </Tab.Pane>
            ))}
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>
    </div>
  );
}
