import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Header } from 'semantic-ui-react';
import Map from '../components/Map';

/** After the user clicks the "Signout" link in the NavBar, log them out and display this page. */
export default class Signout extends React.Component {
  render() {
    Meteor.logout();
    return (
        <div id='sign'>
          <Header id="signout-page" as="h2" textAlign="center">
            <p>You are signed out.</p>
          </Header>
          <Map/>
        </div>
    );
  }
}
