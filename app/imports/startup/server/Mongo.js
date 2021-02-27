import { Meteor } from 'meteor/meteor';
import { Trips } from '../../api/trip/TripCollection.js';

/* eslint-disable no-console */

/** Initialize the database with a default data document. */
function addData(data) {
  console.log(`  Adding: trip on ${data.date} using ${data.mode} by ${data.owner}`);
  Trips.define(data);
}

/** Initialize the trips collection if empty. */
if (Trips.count() === 0) {
  if (Meteor.settings.defaultTrips) {
    console.log('Creating default trips.');
    Meteor.settings.defaultTrips.map(data => addData(data));
  }
}
