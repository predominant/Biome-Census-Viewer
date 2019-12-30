import React from 'react';

export default function ServerHeader(props) {
  const { server } = props;

  var statusClass = '';
  switch (server.status) {
    case 'OK':
      statusClass = 'good';
      break;
    case 'ERROR':
      statusClass = 'bad';
      break;
  }

  return (
    <React.Fragment>
      <div className={`status-indicator ${statusClass}`}></div>
      <div className="server-details">
        <div className="server-name">{server.name}</div>
        <div className="server-address">{server.address}</div>
      </div>
    </React.Fragment>
  );
};
