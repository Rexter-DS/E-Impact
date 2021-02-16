import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Icon, Image, Menu, Sidebar } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

const SidebarVisible = () => {
  const currentUser = Meteor.userId() ? Meteor.userId() : '';
  console.log(currentUser);
  return (currentUser ? <div><Sidebar
            as={Menu}
            animation='overlay'
            icon='labeled'
            vertical
            visible
            width='thin'
        >
          <Menu.Item
              style={{ padding: 0 }}>
            <Image size='large'
                   src="images/EImpactLogo.png"
            />
          </Menu.Item>
          <Menu.Item as={NavLink}
                     activeClassName=""
                     exact
                     to="/Dashboard"
                     style={{ color: '#0c4d85' }}>
            <Icon name='grid layout'/>
            Dashboard
          </Menu.Item>
          <Menu.Item as={NavLink}
                     activeClassName="active"
                     exact
                     to="/daily"
                     key='daily'
                     style={{ color: '#0c4d85' }}>
            <Icon name='list'/>
            Daily
          </Menu.Item>
          <Menu.Item as={NavLink}
                     activeClassName="active"
                     exact to="/community"
                     key='community'
                     style={{ color: '#0c4d85' }}>
            <Icon name='globe'/>
            Community
          </Menu.Item>
          <Menu.Item as={NavLink}
                     activeClassName="active"
                     exact
                     to="/signout"
                     key='signout'
                     style={{ color: '#0c4d85' }}>
            <Icon name='sign-out'/>
            Sign Out
          </Menu.Item>
          <Menu.Item style={{ color: '#0c4d85' }}>
            <Icon name='user circle outline'/>
            {currentUser}
          </Menu.Item>
        </Sidebar></div> : '');
};
export default SidebarVisible;
