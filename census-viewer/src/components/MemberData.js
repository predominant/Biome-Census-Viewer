import React from 'react';
import JSONPretty from 'react-json-pretty';
import 'react-json-pretty/themes/monikai.css';

export default function MemberData(props) {
  const { member } = props;

  return (
    <JSONPretty id="raw-data" data={member} />
  );
};
