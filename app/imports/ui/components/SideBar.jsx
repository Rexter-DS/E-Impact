import { Meteor } from 'meteor/meteor';
import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Icon, Image, Menu, Sidebar } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

const SideBar = (props) => (
    props.currentUser ? <div><Sidebar
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
               to={`/Dashboard/${Meteor.user()?.username}`}
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
               exact
               to="/compare"
               key='compare'
               style={{ color: '#0c4d85' }}>
      <Icon name='car'/>
      Compare
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
      {Meteor.user() ? Meteor.user().username : 'Guest'}
    </Menu.Item>
  </Sidebar></div> : '');

SideBar.propTypes = {
  currentUser: PropTypes.string,
}

export default withTracker(() => {
  const currentUser = Meteor.userId() ? Meteor.userId() : '';
  return {
    currentUser,
  };
})(SideBar);
