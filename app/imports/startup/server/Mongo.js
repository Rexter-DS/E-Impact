import { Meteor } from 'meteor/meteor';
import { Trips } from '../../api/trip/TripCollection.js';
import { Users } from '../../api/user/UserCollection';
import { SavedTrips } from '../../api/trip/SavedTripCollection';

/* eslint-disable no-console */

/** Initialize the database with a default data document. */
function addTripData(data) {
  console.log(`  Adding: trip on ${data.date} using ${data.mode} by ${data.owner}`);
  Trips.define(data);
}

/** Initialize the trips collection if empty. */
if (Trips.find().count() === 0) {
  // if (Meteor.settings.defaultTrips) {
    // console.log('Creating default trips.');
    // Meteor.settings.defaultTrips.map(data => addTripData(data));
  // if (Meteor.settings.loadAssetsFile) {
    const assetsFileName = 'data.json';
    console.log(`Loading data from private/${assetsFileName}`);
    const jsonData = JSON.parse(Assets.getText(assetsFileName));
    jsonData.defaultTrips.map(trip => addTripData(trip));
  // }
}

/** Initialize the database with a default data document. */
function addUserData(data) {
  console.log(`  Adding: user ${data.username} with auto mpg ${data.autoMPG} with a round trip of ${data.homeRoundTrip}`);
  Users.define(data);
}

/** Initialize the users collection if empty. */
if (Users.find().count() === 0) {
  if (Meteor.settings.defaultUsers) {
    console.log('Creating default users.');
    Meteor.settings.defaultUsers.map(data => addUserData(data));
  }
}
