import React, { Component } from 'react';
import './SelectListItem.css';

class SelectListItem extends Component {
  constructor(props) {
    super(props);
    this.selectItem = this.selectItem.bind(this);
    this.state = {
      selectedItem: null,
    }
  }

  selectItem() {
    this.setState({selectedItem: this.props.member_id !== undefined ? this.props.member_id : this.props.name});
    this.props.parentCallback(this.props.member_id !== undefined ? this.props.member_id : this.props.name);
  }

  render() {
    return (
      <div className="SelectListItem" onClick={this.selectItem}>
        {this.props.name}
      </div>
    );
  }
}

export default SelectListItem;
