import React, { Component } from 'react';
import { DropdownButton, MenuItem } from 'react-bootstrap';

export default class Dropdown extends Component {
  render() {
    // const { selection } = this.props;
    return (
      <DropdownButton
        // bsStyle={title.toLowerCase()}
        title="Filters"
        // key={i}
        id={`dropdown-basic`}
      >
        <MenuItem eventKey="1">clarendon</MenuItem>
        <MenuItem eventKey="2">gingham</MenuItem>
        <MenuItem eventKey="3">moon</MenuItem>
        <MenuItem eventKey="4">lark</MenuItem>
        <MenuItem eventKey="5">reyes</MenuItem>
        <MenuItem eventKey="6">juno</MenuItem>
        <MenuItem eventKey="7">slumber</MenuItem>
        <MenuItem eventKey="8">aden</MenuItem>
        <MenuItem eventKey="9">perpetua</MenuItem>
        <MenuItem eventKey="10">mayfair</MenuItem>
        <MenuItem eventKey="11">rise</MenuItem>
        <MenuItem eventKey="12">hudson</MenuItem>
        <MenuItem eventKey="13">valencia</MenuItem>
        <MenuItem eventKey="14">xpro2</MenuItem>
        <MenuItem eventKey="15">willow</MenuItem>
        <MenuItem eventKey="16">lofi</MenuItem>
        <MenuItem eventKey="17">inkwell</MenuItem>
        <MenuItem eventKey="18">nashville</MenuItem>
        <MenuItem divider />
        <MenuItem eventKey="19">normal</MenuItem>
      </DropdownButton>
    );
  }
}
