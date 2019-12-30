import React from 'react';
import { ListGroup } from 'react-bootstrap';

export default function ServerSelector(props) {
  const { server, handleServerChange, handleServerDelete } = props;
  return (
    <ListGroup.Item key={server.address}>
      <i className="status-indicator small">&nbsp;</i>
      <a href="#0" onClick={() => handleServerChange(server)}>{server.name}</a>
      <a href="#0" className="float-right" onClick={e => handleServerDelete(server)}>x</a>
    </ListGroup.Item>
  );
};
