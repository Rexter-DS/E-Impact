import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Button } from 'semantic-ui-react';
import { Accounts } from 'meteor/accounts-base';

import PropTypes from 'prop-types';
import { tripPublications, Trips } from '../../api/trip/TripCollection';
import { userPublications, Users } from '../../api/user/UserCollection';
import { savedTripPublications } from '../../api/trip/SavedTripCollection';


/** Renders a single row in the List Trip table. See pages/ListTrip.jsx. */
const TempAddData = (props) => {
  const emails = ['bammab@foo.com', 'barrab@foo.com', 'bommob@foo.com', 'borrob@foo.com', 'bemmeb@foo.com', 'berreb@foo.com',
    'bimmib@foo.com', 'birrib@foo.com', 'bummub@foo.com', 'burrub@foo.com', 'tammat@foo.com', 'tarrat@foo.com', 'tommot@foo.com',
    'torrot@foo.com', 'temmet@foo.com', 'terret@foo.com', 'timmit@foo.com', 'tirrit@foo.com', 'tummut@foo.com', 'turrut@foo.com',
    'gammag@foo.com','garrag@foo.com', 'gommog@foo.com', 'gorrog@foo.com', 'gemmeg@foo.com', 'gerreg@foo.com', 'gimmig@foo.com',
    'girrig@foo.com', 'gummug@foo.com', 'gurrug@foo.com', 'kammak@foo.com', 'karrak@foo.com', 'kommok@foo.com', 'korrok@foo.com',
    'kemmek@foo.com', 'kerrek@foo.com', 'kimmik@foo.com', 'kirrik@foo.com', 'kummuk@foo.com', 'kurruk@foo.com', 'namman@foo.com',
    'narran@foo.com', 'nommon@foo.com', 'norron@foo.com', 'nemmen@foo.com', 'nerren@foo.com', 'nimmin@foo.com', 'nirrin@foo.com',
    'nummun@foo.com', 'nurrun@foo.com']

  function addData() {
    for (let e = 0; e < emails.length; e++) {
      const email = emails[e];
      for (let m = 1; m < 5; m++) {
        for (let d = 1; d < 32; d++) {
          if (m === 2 && d > 28) {
            break;
          } else if (m === 4 && d > 7) {
            break;
          }
          const trips = Math.floor(Math.random() * 3);
          for (let i = 0; i < trips; i++) {
            const date = new Date(`2021-${m}-${d}`);
            const distance = Math.floor(Math.random() * 45) + 5;
            const mode = ['Telework', 'Public Transportation', 'Bike', 'Walk', 'Carpool', 'Electric Vehicle', 'Gas Car'][Math.floor(Math.random() * 5)];
            const mpg = Math.floor(Math.random() * 30) + 15;
            const county = ['Hawaii', 'Honolulu', 'Kalawao', 'Kauai', 'Maui'][Math.floor(Math.random() * 5)]
            const owner = email;
            Trips.defineWithMessage({ date, mode, distance, mpg, owner, county });
          }
        }
      }
    }
    console.log('Added Shit');
  }

  return (
      <Button circular onClick={addData}>
        Add Shit
      </Button>
  );
}

/** Require a document to be passed to this component. */
TempAddData.propTypes = {
  readyTrips: PropTypes.bool.isRequired,
  trips: PropTypes.array.isRequired,
};

export default withTracker(() => {
  const readyTrips = Meteor.subscribe(tripPublications.trip).ready();
  const trips = Trips.find({}).fetch();
  return {
    readyTrips,
    trips,
  };
})(TempAddData);
