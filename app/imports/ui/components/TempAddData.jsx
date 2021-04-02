import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Button } from 'semantic-ui-react';
import createUser from 'app/imports/startup/server/Accounts.js';

import PropTypes from 'prop-types';
import { tripPublications, Trips } from '../../api/trip/TripCollection';
import { userPublications, Users } from '../../api/user/UserCollection';


/** Renders a single row in the List Trip table. See pages/ListTrip.jsx. */
const TempAddData = (props) => {
  const counties = ['Hawaii', 'Honolulu', 'Kalawao', 'Kauai', 'Maui']
  const cities = ['Kaneohe', 'Kailua', 'Waipahu', 'Waianae', 'Kapolei'];
  const colors = ['Red', 'Blue', 'Green', 'Yellow', 'Orange']
  const gender = ['Man', 'Woman']
  let g; let color; let city;
  const emails = [];
  for (city in cities) {
    for (color in colors) {
      for (g in gender) {
        const email = `${city + color + g}@foo.com`;
        emails.push(email);
      }
    }
  }
  const firstLetter = ['b', 't', 'g', 'k','n'];
  const secondLetter = ['a','o','e','i','u'];
  const lastLetter = ['m','r']
  let f; let s; let l;
  const firstNames = [];
  const lastNames = [];
  for (f in firstLetter) {
    for (s in secondLetter) {
      for (l in lastLetter) {
        const fname = `${f + s + l}`;
        const lname = `${l + s + f}`;
        firstNames.push(fname);
        lastNames.push(lname);
      }
    }
  }
  function addData() {
    for (let i = 0; i < 50; i++) {
      createUser(county=counties[Math.floor(Math.random() * counties.length)], first, last, email, password, role);
    }

  }

  return (
      <Button postive circular icon='+' onClick={addData}>

      </Button>
  );
}

/** Require a document to be passed to this component. */
TempAddData.propTypes = {

};

export default withTracker(() => {

  return {

  };
})(TempAddData);
