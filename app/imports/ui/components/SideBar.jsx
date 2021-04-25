import React, { useEffect, useState } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Header, Icon, Image, Menu, Modal, Sidebar } from 'semantic-ui-react';
import DarkModeToggle from 'react-dark-mode-toggle';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Users } from '../../api/user/UserCollection';
import Settings from './Settings';

function SideBar(props) {

  const handleChange = () => {
    Users.updateTheme(props.userProfile.username);
  };

  if (props.userReady && (document.getElementById('sidebar'))) {
    // console.log(document.getElementsByClassName('sidebar-item'));

    const sidebarItems = document.getElementsByClassName('sidebar-item');

    if (props.userProfile.theme === 'dark') {
      this.sidebarLogo = 'images/EImpactLogoWhite.png';
      document.body.classList.add('dark');
      document.getElementById('sidebar').classList.add('dark-sidebar');
      for (let i = 0; i < sidebarItems.length; i++) {
        sidebarItems[i].classList.add('dark-sidebar-item');
        sidebarItems[i].classList.remove('light-sidebar-item');
      }
    } else {
      this.sidebarLogo = 'images/EImpactLogo.png';
      document.body.classList.remove('dark');
      document.getElementById('sidebar').classList.remove('dark-sidebar');
      for (let i = 0; i < sidebarItems.length; i++) {
        sidebarItems[i].classList.add('light-sidebar-item');
        sidebarItems[i].classList.remove('dark-sidebar-item');
      }
    }
  }

  const [settings, setSettings] = useState(false);

  useEffect(() => {
    const dashboardModals = document.getElementsByClassName('card-modal');
    if (props.userProfile.theme === 'dark') {
      for (let i = 0; i < dashboardModals.length; i++) {
        dashboardModals[i].classList.add('dark-card');
      }
    } else {
      for (let i = 0; i < dashboardModals.length; i++) {
        dashboardModals[i].classList.remove('dark-card');
      }
    }
  }, [props.userProfile, settings]);

  return (
      (props.userReady) ?
      <div>
        <Sidebar
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
                     src={this.sidebarLogo}
              />
            </Menu.Item>
            <Menu.Item as={NavLink}
                       className='sidebar-item'
                       activeClassName=""
                       exact
                       to={`/Dashboard/${props.userProfile.username}`}>
              <Icon name='grid layout'/>
              Dashboard
            </Menu.Item>
            <Menu.Item as={NavLink}
                       className='sidebar-item'
                       activeClassName="active"
                       exact
                       to={`/daily/${props.userProfile.username}`}
                       key='daily'>
              <Icon name='list'/>
              Daily
            </Menu.Item>
            <Menu.Item as={NavLink}
                       className='sidebar-item'
                       activeClassName=""
                       exact
                       to={`/WhatIf/${props.userProfile.username}`}>
              <Icon name='grid layout'/>
              What If
            </Menu.Item>
            <Menu.Item as={NavLink}
                       className='sidebar-item'
                       activeClassName="active"
                       exact
                       to={`/compare/${props.userProfile.username}`}
                       key='compare'>
              <Icon name='car'/>
              Compare
            </Menu.Item>
            <Menu.Item as={NavLink}
                       className='sidebar-item'
                       activeClassName="active"
                       exact to={`/community/${props.userProfile.username}`}
                       key='community'>
              <Icon name='globe'/>
              Community
            </Menu.Item>
            <Menu.Item as={NavLink}
                       className='sidebar-item'
                       activeClassName="active"
                       exact
                       to="/admin"
                       key='admin'>
              <Icon name='cog'/>
              Admin Page
            </Menu.Item>
            <Menu.Item as={NavLink}
                       className='sidebar-item'
                       activeClassName="active"
                       exact
                       to="/"
                       key='signout'>
              <Icon name='sign-out'/>
              Sign Out
            </Menu.Item>
            <Menu.Item>
              <DarkModeToggle
                  checked={props.theme === 'dark'}
                  onChange={handleChange}
                  size={60}/>
            </Menu.Item>
            <Modal
                closeIcon
                open={settings}
                onOpen={() => setSettings(true)}
                onClose={() => setSettings(false)}
                trigger={
                  <Menu.Item
                      id='sidebar-current-user'
                      className='sidebar-item'
                      style={{ bottom: '0' }}
                  >
                    <Icon name='user circle outline'/>
                    {props.userProfile.username}
                  </Menu.Item>
                }
            >
              <Header className='card-modal'>Settings</Header>
              <Modal.Content className='card-modal'>
                <Settings
                    docId={props.userProfile._id}
                    username={props.userProfile.username}
                    userMpg={props.userProfile.autoMPG}
                    userHomeRoundTrip={props.userProfile.homeRoundTrip}
                />
              </Modal.Content>
            </Modal>
          </Sidebar>
      </div> :
       <div></div>
  );
}

SideBar.propTypes = {
  userReady: PropTypes.bool.isRequired,
  theme: PropTypes.string,
  userProfile: PropTypes.object,
};

export default withTracker(() => {
  const userReady = Users.subscribeUser().ready();
  return userReady;
})(SideBar);
