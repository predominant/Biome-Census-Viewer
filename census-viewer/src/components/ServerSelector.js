import React from 'react';
import { ListGroup } from 'react-bootstrap';

export default function ServerSelector(props) {
  const { server, handleServerChange } = props;
  return (
    <ListGroup.Item action key={server.address} onClick={() => handleServerChange(server)} >
      <i className="status-indicator small">&nbsp;</i>
      {server.name}
    </ListGroup.Item>
  );
};
