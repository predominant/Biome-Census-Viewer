import React from 'react';

export default function MemberInspector(props) {
  const { member } = props;

  return (
    <React.Fragment>
      Inspector
      <p>{JSON.stringify(member)}</p>
    </React.Fragment>
  )
};
