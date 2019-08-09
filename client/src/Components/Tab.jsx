import React, { Component } from "react";
import { Tabs } from "react-bootstrap";
import { Tab } from "react-bootstrap";
import { Button } from "react-bootstrap";
const TabComponent = props => {
  return (
    <Tabs
      id="controlled-tab-example"
      activeKey={props.keys}
      onSelect={props.onSelect}
    >
      <Tab eventKey="home" title="Client Information">
        <p>TAB 1</p>
      </Tab>
      <Tab eventKey="profile" title="Accounts">
        <p>TAB 2</p>
      </Tab>
      <Tab eventKey="contact" title="Contact">
        <p>TAB 3</p>
      </Tab>
    </Tabs>
  );
};
export default TabComponent;
