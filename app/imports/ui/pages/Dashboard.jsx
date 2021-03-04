import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import React from 'react';
import PropTypes from 'prop-types';
import { Dimmer, Loader } from 'semantic-ui-react';
import { Trips } from '../../api/trip/TripCollection';
import { Users } from '../../api/user/UserCollection';
import DashboardContent from '../components/DashboardContent';

/* The dashboard that contains graphs that contains the graphs to display data to the user */
function Dashboard({ tripReady, userReady, trips, tripCount, modesOfTransport, userProfile }) {

  return ((tripReady && userReady) ?
      <DashboardContent trips={trips} tripCount={tripCount} modesOfTransport={modesOfTransport} userProfile={userProfile}/>
      :
      <Dimmer active>
        <Loader>Loading Data</Loader>
      </Dimmer>);
}

Dashboard.propTypes = {
  trips: PropTypes.array,
  tripCount: PropTypes.number,
  modesOfTransport: PropTypes.array,
  userProfile: PropTypes.any,
  tripReady: PropTypes.bool.isRequired,
  userReady: PropTypes.bool.isRequired,
};

export default withTracker(() => {
  const tripSubscribe = Trips.subscribeTrip();
  const userSubscribe = Users.subscribeUser();
  const username = Meteor.user().username;
  return {
    trips: Trips.getTrips(username),
    tripCount: Trips.getTripCount(username),
    modesOfTransport: Trips.getModesOfTransport(username),
    userProfile: Users.getUserProfile(username),
    tripReady: tripSubscribe.ready(),
    userReady: userSubscribe.ready(),
  };
})(Dashboard);
