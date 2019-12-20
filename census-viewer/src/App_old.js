import React, { useState, useEffect } from 'react';
import useInterval from './hooks/useInterval';

import logo from './biome-logo.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

export default function App(props) {
  const [error, setError] = useState(false);
  const [timer, setTimer] = useState(null);
  const [interval, setInterval] = useState(3000);
  const [endpoint, setEndpoint] = useState('http://localhost:5555/census');
  const [lastPoll, setLastPoll] = useState(null);
  // const [isPolling, setIsPolling] = useState(false);
  const [serviceGroups, setServiceGroups] = useState([]);
  const [services, setServices] = useState({});
  // const [members, setMembers] = useState({});
  // const [selectedServiceGroup, setSelectedServiceGroup] = useState(null);
  // const [selectedService, setSelectedService] = useState(null);
  // const [selectedFullServiceGroup, setSelectedFullServiceGroup] = useState(null);
  // const [selectedMember, setSelectedMember] = useState(null);
  // const [selectedMemberHostname, setSelectedMemberHostname] = useState(null);
  // const [selectedMemberData, setSelectedMemberData] = useState(null);

  const handlePollResponse = payload => setLastPoll(payload);

  // useEffect(() => {
  //   if (lastPoll === null)
  //     return;
  //   // Take the service groups names (service_name.group_name), and extract the group name part.
  //   // It then jams it into a set, and extracts the elements to an array so only unique items remain.
  //   let newServiceGroups = [...new Set(Object.keys(lastPoll.census_groups).map(i => i.split('.')[1]))].sort();
  //   if (JSON.stringify(serviceGroups) !== JSON.stringify(newServiceGroups)) {
  //     console.log('Updated list of service groups');
  //     setServiceGroups(newServiceGroups);
  //   }
  //   console.table(serviceGroups);

  //   let newServices = {};
  //   serviceGroups.map(serviceGroup => {
  //     console.log(`SG: ${serviceGroup}`);
  //     newServices[serviceGroup] = new Set()
  //   });
  //   console.table(newServices);
  //   Object.keys(lastPoll.census_groups).map(service => {
  //     const [svc, grp] = service.split('.');
  //     newServices[grp].add(svc);
  //   });
  // }, [lastPoll]);

  // function poll() {
  //   fetch(endpoint)
  //   .then(result => result.json())
  //   .then(result => {
  //     setError(false);
  //     handlePollResponse(result);
  //     // pollSuccess(result);
  //   })
  //   .catch(err => {
  //     setError(true);
  //     console.error(err);
  //   });
  // }

  // useInterval(() => {
  //   poll();
  // }, interval);

  function pollSuccess(payload) {
    console.log('Polling completed');
    console.log('------------------------------------------------------------')
    setLastPoll(payload);
    
    // Take the service groups names (service_name.group_name), and extract the group name part.
    // It then jams it into a set, and extracts the elements to an array so only unique items remain.
    let newServiceGroups = [...new Set(Object.keys(payload.census_groups).map(i => i.split('.')[1]))].sort();
    if (JSON.stringify(serviceGroups) !== JSON.stringify(newServiceGroups)) {
      console.log('Updated list of service groups');
      setServiceGroups(newServiceGroups);
    }
    console.table(serviceGroups);

    let newServices = {};
    serviceGroups.map(serviceGroup => {
      console.log(`SG: ${serviceGroup}`);
      newServices[serviceGroup] = new Set()
    });
    console.table(newServices);
    Object.keys(payload.census_groups).map(service => {
      const [svc, grp] = service.split('.');
      newServices[grp].add(svc);
    });
    // console.log(newServices);
      // event.census_groups[serviceGroup].population.map(member => {
      //   newServices[serviceGroup].add(member);
      // });

    // console.log(newServices);

    
    // setServices();

    // const serviceGroupsSet = new Set();
    // const services = {};
    // const members = {};

    // for (var serviceGroup in event.census_groups) {
    //   for (var memberId in event.census_groups[serviceGroup].population) {
    //     var member = event.census_groups[serviceGroup].population[memberId];
    //     // Keep a unique record of the service group names.
    //     const groupName = member.group;
    //     serviceGroupsSet.add(groupName);
        
    //     // Create an entry in the services Set
    //     if (!services.hasOwnProperty(groupName))
    //       services[groupName] = new Set();
    //     services[groupName].add(member.service);

    //     // Create an entry to track the unique member ID
    //     if (!members.hasOwnProperty(serviceGroup))
    //       members[serviceGroup] = {};
    //       members[serviceGroup][member.member_id] = member;
    //   }
    // };

    // setServiceGroups(Array.from(serviceGroups));
    // setServices(Object.keys(services));

    // // Update Service Groups
    // const groupsArray = Array.from(groups);
    // setServiceGroups(groupsArray);
    // serviceGroupsList.current.setItems(groupsArray);

    // // Update Services
    // const servicesObject = {};
    // for (var group in services) {
    //   servicesObject[group] = Array.from(services[group]);
    // }
    // setServices(servicesObject);

    // //console.debug(members);
    // setMembers(members);
  }

  function pollFailure(payload) {
    console.error("Failed to poll URI:");
    console.debug(payload);
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

  function handleEndpointChange(e) {
    setEndpoint(e.target.value);
  }

  return (
    <div className="App">
      <div className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>Biome Census Viewer</h2>
        <input className="endpoint" value={endpoint} onChange={handleEndpointChange} />
        <div className="App-poller">
          {error ? <div className="polling">&nbsp;</div> : <div className="not-polling">&nbsp;</div>}
        </div>
      </div>
      <div className="App-sidebar">
        &nbsp;
      </div>
      <div className="App-main">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md">
              {/* <SelectableList items={serviceGroups} parentCallback={setSelectedServiceGroup} /> */}
              <ul className="list-group">
                {serviceGroups.map(item => {
                  return (
                    <li key={item}>
                      <p>{item}</p>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
        {/* <Container fluid="true">
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
        </Container> */}
      </div>
    </div>
  );
}
