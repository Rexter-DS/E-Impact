import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Icon, Menu, Sidebar } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

const SidebarVisible = () => {
  const currentUser = Meteor.userId() ? Meteor.userId() : '';
  console.log(Meteor.user(), Meteor.userId());
  return (currentUser ? <div><Sidebar
            as={Menu}
            animation='overlay'
            icon='labeled'
            inverted
            vertical
            visible
            width='thin'
        >
          <Menu.Item as={NavLink}
                     activeClassName=""
                     exact
                     to="/Dashboard">
            <Icon name='grid layout'/>
            Dashboard
          </Menu.Item>
          <Menu.Item as={NavLink}
                     activeClassName="active"
                     exact
                     to="/daily"
                     key='daily'>
            <Icon name='list'/>
            Daily
          </Menu.Item>
          <Menu.Item as={NavLink}
                     activeClassName="active"
                     exact to="/community"
                     key='community'>
            <Icon name='globe'/>
            Community
          </Menu.Item>
          <Menu.Item as={NavLink}
                     activeClassName="active"
                     exact
                     to="/signout"
                     key='signout'>
            <Icon name='sign-out'/>
            Sign Out
          </Menu.Item>
        </Sidebar></div> : '');
};
export default SidebarVisible;
