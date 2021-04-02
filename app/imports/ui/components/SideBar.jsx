import { Meteor } from 'meteor/meteor';
import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Icon, Image, Menu, Sidebar, Checkbox } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Users } from '../../api/user/UserCollection';

const handleChange = () => {
  Users.updateTheme(Meteor.user()?.username);
  if (Users.getUserProfile(Meteor.user()?.username).theme === 'dark') {
    document.body.classList.add('dark');
  } else {
    document.body.classList.remove('dark');
  }
  //console.log(Users.getUserProfile(Meteor.user()?.username).theme);
};

const SideBar = (props) => (
    props.currentUser ? <div><Sidebar
      as={Menu}
      animation='overlay'
      icon='labeled'
      vertical
      visible
      width='thin'
      id='sidebar'
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
      <Menu.Item>
        <Checkbox toggle checked={props.theme === 'dark'} onChange={handleChange} />
      </Menu.Item>
    <Menu.Item style={{ color: '#0c4d85', position: 'fixed', bottom: '0' }}>
      <Icon name='user circle outline'/>
      {Meteor.user() ? Meteor.user().username : 'Guest'}
    </Menu.Item>
  </Sidebar></div> : '');

SideBar.propTypes = {
  currentUser: PropTypes.string,
  userReady: PropTypes.bool.isRequired,
  theme: PropTypes.string,
};

export default withTracker(() => {
  const currentUser = Meteor.userId() ? Meteor.userId() : '';
  const user = Users.subscribeUser();
  return {
    currentUser: currentUser,
    userReady: user.ready(),
  };
})(SideBar);
