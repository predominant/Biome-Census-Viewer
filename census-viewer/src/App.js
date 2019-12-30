import React, { useState, useEffect } from 'react';
import { useInterval } from './hooks/useInterval';

import { Container, Row, Col, ListGroup, ListGroupItem, Navbar, Nav, FormControl, Form, Button, Tab } from 'react-bootstrap';

import store from 'store';

import logo from './biome-logo.png';
import logo2 from './biome-logo-02.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import PollError from './components/PollError';
import Select from 'react-select';
import ViewStateButton from './components/ViewStateButton';
import ViewState, { useViewState } from './hooks/ViewState';
import SideMenu from './components/SideMenu';
import MemberInspector from './components/MemberInspector';
import MemberData from './components/MemberData';
import MemberHeader from './components/MemberHeader';
import ServerHeader from './components/ServerHeader';
//import ViewStateEnum from './ViewStateEnum';

export default function App(props) {
  const emptyPath = {
    serviceGroup: null,
    service: null,
    fullServiceGroup: null,
    member: null
  };

  const emptyServer = {
    name: '',
    address: '',
    status: 'UNKNOWN',
  };

  // const [endpoint, setEndpoint] = useState('http://localhost:5555/census');
  const [currentServer, setCurrentServer] = useState(emptyServer);
  const [servers, setServers] = useState(store.get('servers', []));
  const [data, setData] = useState(null);
  const [delay, setDelay] = useState(3000);
  const [pollError, setPollError] = useState(null);
  const [viewState, setViewState] = useViewState(ViewState.INSPECTOR);
  const [path, setPath] = useState(emptyPath);

  const [serviceGroups, setServiceGroups] = useState([]); // All service groups.
  const [services, setServices] = useState({}); // All services, grouped by service group.
  const [members, setMembers] = useState({});
  const [member, setMember] = useState(null);

  // console.log(serviceGroups);
  // console.log(services)
  // console.log(members);
  // console.log(path);

  function handlePollResponse(result) {
    setPollError(false);
    setData(result);
    setCurrentServer({...currentServer, status: 'OK'});

    if (result === null || !result.hasOwnProperty('census_groups')) {
      setPollError(true);
      setCurrentServer({...currentServer, status: 'ERROR'});
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
    setCurrentServer({...currentServer, status: 'ERROR'});
  }

  function pollEndpoint() {
    if (currentServer === null)
      return;
    
    fetch(currentServer.address)
      .then(result => result.json())
      .then(result => handlePollResponse(result))
      .catch(err => handlePollError(err));
  }

  // Poll the endpoint at set intervals.
  useInterval(async () => {
    await pollEndpoint();
  }, delay);

  function handleViewStateChange(state) {
    setViewState(state);
  }

  function handleServiceGroupChange(selectedOption) {
    setPath({
      serviceGroup: selectedOption,
      service: null,
      fullServiceGroup: null,
      member: null,
    });
    setMember(null);
  }

  function handleServiceChange(selectedOption) {
    setPath({
      ...path,
      fullServiceGroup: `${selectedOption.value}.${path.serviceGroup.value}`,
      service: selectedOption,
      member: null,
    });
    setMember(null);
  }

  function handleMemberChange(selectedOption) {
    setPath({
      ...path,
      member: selectedOption,
    });
    setMember(members[path.fullServiceGroup][selectedOption.value]);
  }

  function getMemberRenderer(member) {
    const debug = viewState & ViewState.DEBUG !== 0;

    if (viewState & ViewState.DATA)
      return <MemberData member={member} debug={debug}/>;

    // Default return is the inspector;
    return <MemberInspector member={member} debug={debug}/>;
  }

  // Update local storage when the server changes.
  useEffect(() => {
    store.set('servers', servers);
  }, [servers]);

  function handleServerAdd(name, address) {
    setServers([...servers, {
      name: name,
      address: address,
      status: 'UNKNOWN',
    }]);
  }

  function handleServerChange(server) {
    console.log(`Setting server endpoint: ${server.address}`);
    // setEndpoint(server.address);
    setCurrentServer(server);
    setPath(emptyPath);
    setServiceGroups([]);
    setMember(null);
  }

  function handleServerDelete(server) {
    console.log(`Deleting a server: ${server.address}`);
    setServers(servers.filter(s => s.name != server.name && s.address != server.address));

    if (currentServer.name == server.name && currentServer.address == server.address)
      setCurrentServer(emptyServer);
  }

  return (
    <div className="wrapper">
      <nav id="sidebar">
        <div className="logo">
          <img src={logo2} alt="Biome" />
        </div>
        <SideMenu
          servers={servers}
          handleServerAdd={handleServerAdd}
          handleServerChange={handleServerChange}
          handleServerDelete={handleServerDelete}/>
      </nav>

      <div id="content">
        <nav id="topbar">
          <ServerHeader server={currentServer} />
          <div className="view-toggle">
            <div className="btn-group btn-group-lmdg" role="group">
              <ViewStateButton
                type={ViewState.INSPECTOR}
                currentstate={viewState}
                onClick={() => handleViewStateChange(ViewState.INSPECTOR)}>
                  Inspector
              </ViewStateButton>
              <ViewStateButton
                type={ViewState.DATA}
                currentstate={viewState}
                onClick={() => handleViewStateChange(ViewState.DATA)}>
                  Raw Data
              </ViewStateButton>
            </div>
          </div>
        </nav>

        <Container>
          <Row className="data-navigator">
            <Col>
              <b>Service Group</b>
              <Select
                options={serviceGroups.map(i => { return { value:i, label:i };})}
                onChange={handleServiceGroupChange}
                value={path.serviceGroup}/>
            </Col>
            <Col>
              {path.serviceGroup !== null &&
                <React.Fragment>
                  <b>Service</b>
                  <Select
                    options={services[path.serviceGroup.value].map(i => { return { value:i, label:i };})}
                    onChange={handleServiceChange}
                    value={path.service}/>
                </React.Fragment>
              }
            </Col>
            <Col>
              {path.service !== null &&
                <React.Fragment>
                  <b>Member</b>
                  <Select
                    options={Object.keys(members[path.fullServiceGroup]).map(i => {
                      return {
                        value: i,
                        label: members[path.fullServiceGroup][i].sys.hostname };
                      })}
                    onChange={handleMemberChange}
                    value={path.member}/>
                </React.Fragment>
              }
            </Col>
          </Row>

          {member !== null &&
            <MemberHeader member={member} />
          }

          <Row>
            <Col className="data-pane">
              {path.member !== null && getMemberRenderer(members[path.fullServiceGroup][path.member.value])}
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}
