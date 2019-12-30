import React, { useState } from 'react';
import './SideMenu.css';
import { ListGroup, Modal, Button } from 'react-bootstrap';
import ServerSelector from './ServerSelector';

export default function SideMenu(props) {
  const { servers, handleServerAdd, handleServerChange, handleServerDelete } = props;
  const [showAddModal, setShowAddModal] = useState(false);
  const [serverName, setServerName] = useState('');
  const [serverAddress, setServerAddress] = useState('');

  const serverList = servers.map((s, key) => 
    <ServerSelector
      server={s}
      key={key}
      handleServerChange={handleServerChange}
      handleServerDelete={handleServerDelete}/>
  );

  function serverAdd() {
    setShowAddModal(false);
    handleServerAdd(serverName, serverAddress);
    setServerName('');
    setServerAddress('');
  }

  function handleServerNameChange(e) {
    setServerName(e.target.value);
  }

  function handleServerAddressChange(e) {
    setServerAddress(e.target.value);
  }

  return (
    <div className="side-menu">
      <p className="side-heading">Supervisors</p>
      <ListGroup>
        {serverList}
        <ListGroup.Item action onClick={() => setShowAddModal(true)} key="add">
          <i className="status-indicator small add">+</i>
          Add
        </ListGroup.Item>
      </ListGroup>
      <Modal
        size="lg"
        show={showAddModal}
        onHide={() => setShowAddModal(false)}
        aria-labelledby="add-server-modal-title">
        <Modal.Header closeButton>
          <Modal.Title id="add-server-modal-title">Add Server</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group">
            <label htmlFor="serverNameInput">Name</label>
            <input type="text" className="form-control" id="serverNameInput" value={serverName} onChange={handleServerNameChange}/>
          </div>
          <div className="form-group">
            <label htmlFor="serverAddressInput">Address</label>
            <input type="text" className="form-control" id="serverAddressInput" value={serverAddress} onChange={handleServerAddressChange}/>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setShowAddModal(false)} className="btn btn-secondary">Cancel</Button>
          <Button onClick={() => serverAdd()} className="btn">Add</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
