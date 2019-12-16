import React, { useState, useEffect } from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import SelectList from './SelectList';
import MemberDetail from './MemberDetail';
import ReactPolling from 'react-polling';
import logo from './biome-logo.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

export default function App(props) {
  const [endpoint, setEndpoint] = useState('http://localhost:5555/census');
  const [lastPoll, setLastPoll] = useState(null);
  const [isPolling, setIsPolling] = useState(false);
  const [serviceGroups, setServiceGroups] = useState([]);
  const [services, setServices] = useState({});
  const [members, setMembers] = useState({});
  const [selectedServiceGroup, setSelectedServiceGroup] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedFullServiceGroup, setSelectedFullServiceGroup] = useState(null);
  const [selectedMember, setSelectedMember] = useState(null);
  const [selectedMemberHostname, setSelectedMemberHostname] = useState(null);
  const [selectedMemberData, setSelectedMemberData] = useState(null);
  const [timer, setTimer] = useState(null);
  const [interval, setInterval] = useState(3000);

  const serviceGroupsList = [];

  useEffect(() => {
    setTimer(setInterval(() => {
      console.log('Fetching data');
      fetch(endpoint)
        .then(result => result.json())
        .then(result => pollSuccess(result));
    }, interval));
    // Cleanup
    return () => {
      clearInterval(timer);
    };
  }, [endpoint]);

  function pollSuccess(event) {
    console.log("Polling completed")

    setLastPoll(event);

    // Groups
    const groups = new Set();
    const services = {};
    const members = {};
    for (var serviceGroup in event.census_groups) {
      for (var member in event.census_groups[serviceGroup].population) {
        const groupName = event.census_groups[serviceGroup].population[member].group;
        groups.add(groupName);
        
        if (!services.hasOwnProperty(groupName))
          services[groupName] = new Set();
        services[groupName].add(event.census_groups[serviceGroup].population[member].service);
        
        if (!members.hasOwnProperty(serviceGroup))
          members[serviceGroup] = {};
        members[serviceGroup][event.census_groups[serviceGroup].population[member].member_id] = event.census_groups[serviceGroup].population[member];
      }
    }
    // Update Service Groups
    const groupsArray = Array.from(groups);
    setServiceGroups(groupsArray);
    serviceGroupsList.current.setItems(groupsArray);

    // Update Services
    const servicesObject = {};
    for (var group in services) {
      servicesObject[group] = Array.from(services[group]);
    }
    setServices(servicesObject);

    //console.debug(members);
    setMembers(members);
  }

  function pollFailure(event) {
    console.error("Failed to poll URI:");
    console.debug(event);
  }

  function setServiceGroup(name) {
    console.log("Set Service Group: " + name)
    this.setState({selectedServiceGroup: name});
    this.servicesList.current.setItems(this.state.services[name]);
    this.membersList.current.setItems([]);
    this.selectedMember = null;
    this.selectedMemberHostname = null;
    this.selectedMemberData = null;
  }

  function setService(name) {
    console.log("Set Service: " + name)
    const serviceGroup = name + "." + this.state.selectedServiceGroup
    console.debug(serviceGroup)
    this.membersList.current.setItems(this.state.members[serviceGroup]);

    this.setFullServiceGroup(name + "." + this.state.selectedServiceGroup);
    this.selectedMember = null;
    this.selectedMemberHostname = null;
    this.selectedMemberData = null;
    this.setState({selectedService: name});
  }

  function setFullServiceGroup(name) {
    this.setState({selectedFullServiceGroup: name});
  }

  function setMember(id) {
    console.log("Set Member: " + id)
    console.debug(this.state.selectedFullServiceGroup);
    console.debug(this.state.lastPoll.census_groups);
    const serviceGroupData = this.state.lastPoll.census_groups[this.state.selectedFullServiceGroup];
    var data = {};
    for (var member in serviceGroupData.population) {
      console.log("Check " + member + " === " + id);
      if (member === id)
        data = serviceGroupData.population[member];
    }
    console.debug(data);

    this.memberDetail.current.setData(data);
    this.setState({
      selectedMember: id,
      selectedMemberHostname: data.sys.hostname,
      selectedMemberData: data});
  }

    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Biome Census Viewer</h2>
          <div className="App-poller">
            {isPolling ?
              <div className="polling">&nbsp;</div> :
              <div className="not-polling">&nbsp;</div>}
          </div>
        </div>
        <div className="App-sidebar">
          &nbsp;
        </div>
        <div className="App-main">
          <Container fluid="true">
            <Row>
              <Col>
                <SelectList
                  heading="Service Groups"
                  parentCallback={setServiceGroup}
                  ref={React.forwardRef(serviceGroups)} />
              </Col>
              <Col>
                <SelectList
                  heading="Services"
                  parentCallback={setService}
                  ref={React.forwardRef(services)} />
              </Col>
              <Col>
                <SelectList
                  heading="Members"
                  parentCallback={setMember}
                  ref={members} />
              </Col>
            </Row>
            <Row>
              <Col>
                <MemberDetail ref={React.forwardRef(selectedMember)} />
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    );
}
