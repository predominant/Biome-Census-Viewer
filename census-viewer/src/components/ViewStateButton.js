import React from 'react';

export default function ViewStateButton(props) {
  const { currentstate, type } = props;

  const classes = ['btn'];
  if (currentstate === type) {
    classes.push('active');
    classes.push('btn-secondary');
  } else {
    classes.push('btn-outline-secondary');
  }

  return (
    <button
      type="button"
      //className="btn btn-secondary active"
      className={classes.join(' ')}
      onClick={props.onClick}>
      {props.children}
    </button>
  );
};
