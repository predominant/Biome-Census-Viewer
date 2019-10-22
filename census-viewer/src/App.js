import React, { Component } from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import SelectList from './SelectList';
import MemberDetail from './MemberDetail';
import ReactPolling from 'react-polling';
import logo from './biome-logo.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.pollSuccess = this.pollSuccess.bind(this);
    this.pollFailure = this.pollFailure.bind(this);
    this.setServiceGroup = this.setServiceGroup.bind(this);
    this.setService = this.setService.bind(this);
    this.setFullServiceGroup = this.setFullServiceGroup.bind(this);
    this.setMember = this.setMember.bind(this);

    this.serviceGroupsList = React.createRef();
    this.servicesList = React.createRef();
    this.membersList = React.createRef();
    this.memberDetail = React.createRef();

    this.state = {
      lastPoll: null,

      serviceGroups: [],
      services: {},
      members: {},

      selectedServiceGroup: null,
      selectedService: null,
      selectedFullServiceGroup: null,
      selectedMember: null,
      selectedMemberHostname: null,
      selectedMemberData: null,
    }
  }

  pollSuccess(event) {
    console.log("Polling completed")

    this.setState({lastPoll: event});

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
    this.setState({serviceGroups: groupsArray});
    this.serviceGroupsList.current.setItems(groupsArray);

    // Update Services
    const servicesObject = {};
    for (var group in services) {
      servicesObject[group] = Array.from(services[group]);
    }
    this.setState({services: servicesObject});

    //console.debug(members);
    this.setState({members: members});
  }

  pollFailure(event) {
    console.error("Failed to poll URI:");
    console.debug(event);
  }

  setServiceGroup(name) {
    console.log("Set Service Group: " + name)
    this.setState({selectedServiceGroup: name});
    this.servicesList.current.setItems(this.state.services[name]);
    this.membersList.current.setItems([]);
    this.selectedMember = null;
    this.selectedMemberHostname = null;
    this.selectedMemberData = null;
  }

  setService(name) {
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

  setFullServiceGroup(name) {
    this.setState({selectedFullServiceGroup: name});
  }

  setMember(id) {
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

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Biome Census Viewer</h2>
          <div className="App-poller">
            <ReactPolling
              url="http://localhost:5555/census"
              interval={3000}
              retryCount={3}
              onSuccess={this.pollSuccess}
              onFailure={this.pollFailure}
              method="GET"
              render={({ startPolling, stopPolling, isPolling }) => {
                if(isPolling) {
                  return (
                    <div className="polling">&nbsp;</div>
                  );
                } else {
                  return (
                    <div className="not-polling">&nbsp;</div>
                  );
                }
              }}
              />
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
                  parentCallback={this.setServiceGroup}
                  ref={this.serviceGroupsList} />
              </Col>
              <Col>
                <SelectList
                  heading="Services"
                  parentCallback={this.setService}
                  ref={this.servicesList} />
              </Col>
              <Col>
                <SelectList
                  heading="Members"
                  parentCallback={this.setMember}
                  ref={this.membersList} />
              </Col>
            </Row>
            <Row>
              <Col>
                <MemberDetail ref={this.memberDetail} />
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}

export default App;
