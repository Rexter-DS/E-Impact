import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter, NavLink } from 'react-router-dom';
import { Menu, Button, Header } from 'semantic-ui-react';

/** The NavBar appears at the top of every page. Rendered by the App Layout component. */
class NavBar extends React.Component {
  render() {

    const menuStyle = {
      marginBottom: '0px',
      border: 'none',
      shadow: 'none',
    };

    return (
      <Menu id='landing-nav' style={menuStyle} className='ui borderless top fixed menu'>
        <Menu.Item as={NavLink} activeClassName="" exact to="/">
          <Header id="landing-nav-logo" as='h1'>E-Impact</Header>
        </Menu.Item>
        <Menu.Item position="right">
          <a className='fake-menu-item' href={'#/signin'}><p>LOG IN</p></a>
        </Menu.Item>
        <Menu.Item>
          <Button as={NavLink} activeClassName="" exact to="/signup" basic color='blue'>SIGN UP</Button>
        </Menu.Item>
      </Menu>
    );
  }
}

/** Declare the types of all properties. */
NavBar.propTypes = {
  currentUser: PropTypes.string,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
const NavBarContainer = withTracker(() => ({
  currentUser: Meteor.user() ? Meteor.user().username : '',
}))(NavBar);

/** Enable ReactRouter for this component. https://reacttraining.com/react-router/web/api/withRouter */
export default withRouter(NavBarContainer);
