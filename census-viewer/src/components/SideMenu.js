import React from 'react';
import './SideMenu.css';
import { ListGroup } from 'react-bootstrap';

export default function SideMenu(props) {
  const { servers } = props;
  
  return (
    <div className="side-menu">
      <p className="side-heading">Supervisors</p>
      <ListGroup>
        <ListGroup.Item action>
          <i className="status-indicator small good">&nbsp;</i>
          Test
        </ListGroup.Item>
        <ListGroup.Item>
          <i className="status-indicator small">&nbsp;</i>
          Localhost
        </ListGroup.Item>
        <ListGroup.Item>
          <i className="status-indicator small">&nbsp;</i>
          Localhost
        </ListGroup.Item>
        <ListGroup.Item action>
          <i className="status-indicator small add">+</i>
          Add
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
};
