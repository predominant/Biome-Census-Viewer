import React, { Component } from 'react';
import SelectListItem from './SelectListItem';

class SelectListItemMember extends SelectListItem {
  selectItem() {
    this.setState({selectedItem: this.props.name});
    this.props.parentCallback(this.props.name);
  }
}

export default SelectListItemMember;
