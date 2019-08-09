import React, { Component } from "react";
import Tab from "../../Tab";
import swal from "sweetalert";

class ClientInfo extends Component {
  constructor() {
    super();
    this.state = {
      key: "",
      Name: ""
    };
  }

  handleSelect = e => {
    this.setState({ key: e });
      console.log(e);
  };

  componentDidMount() {}

  render() {
    return (
      <div>
        <Tab keys={this.state.key} onSelect={this.handleSelect} />
      </div>
    );
  }
}
export default ClientInfo;
