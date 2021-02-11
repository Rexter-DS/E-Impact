import React from 'react';
import { Icon, Menu, Sidebar } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

const SidebarVisible = () => (
    <Sidebar
        as={Menu}
        animation='overlay'
        icon='labeled'
        inverted
        vertical
        visible
        width='thin'
    >
      <Menu.Item as={NavLink} activeClassName="" exact to="/Dashboard">
        <Icon name='home' />
        Dashboard
      </Menu.Item>
      <Menu.Item as={NavLink} activeClassName="active" exact to="/addtrip" key='add'>
        <Icon name='add' />
        Add Trip
      </Menu.Item>
      <Menu.Item as={NavLink} activeClassName="active" exact to="/listtrip" key='list'>
        <Icon name='list' />
        List Trip
      </Menu.Item>
      <Menu.Item as={NavLink} activeClassName="active" exact to="/signout" key='signout'>
        <Icon name='sign-out' />
        Sign Out
      </Menu.Item>
    </Sidebar>
);

export default SidebarVisible;
