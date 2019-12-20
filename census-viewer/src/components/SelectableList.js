import React from 'react';

export default function SelectableList(props) {
  const { items } = props;

  return (
    <ul className="list-group">
      {items.map(item => {
        return (
          <li key={item}>
            <p>{item}</p>
          </li>
        );
      })}
    </ul>
  );
};
