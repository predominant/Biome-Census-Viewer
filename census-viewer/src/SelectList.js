import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SelectListItem from './SelectListItem';
import './SelectList.css';

class SelectList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    }
  }

  setItems = (items) => {
    this.setState({items: items});
  }

  render() {
    const items = [];
    if (Array.isArray(this.state.items)) {
      this.state.items.forEach(element => {
        items.push(
          <SelectListItem
            key={element}
            name={element}
            parentCallback={this.props.parentCallback} />
        );
      });
    } else {
      // Deal with an object instead of array
      // This only happens for members.
      for (var prop in this.state.items)
      {
        const obj = this.state.items[prop];
        items.push(
          <SelectListItem
            key={prop}
            member_id={prop}
            name={obj.sys.hostname}
            parentCallback={this.props.parentCallback} />
        );
      }
    }

    return (
      <div className="SelectList">
        <h3>{this.props.heading}</h3>
        <div className="SelectList-content">
          <ul>
            {items}
          </ul>
        </div>
      </div>
    );
  }
}

SelectList.propTypes =  {
  heading: PropTypes.string.isRequired
};

export default SelectList;