import React, { useState } from 'react';
import SelectListItem from './SelectListItem';
import './SelectList.css';

export default function SelectList(props) {
  const [items, setItems] = useState([]);

  if (Array.isArray(items)) {
    items.forEach(element => {
      items.push(
        <SelectListItem
          key={element}
          name={element}
          parentCallback={props.parentCallback} />
      );
    });
  } else {
    // Deal with an object instead of array
    // This only happens for members.
    for (var prop in items)
    {
      const obj = items[prop];
      items.push(
        <SelectListItem
          key={prop}
          member_id={prop}
          name={obj.sys.hostname}
          parentCallback={props.parentCallback} />
      );
    }
  }

  return (
    <div className="SelectList">
      <h3>{props.heading}</h3>
      <div className="SelectList-content">
        <ul>
          {items}
        </ul>
      </div>
    </div>
  );
}
