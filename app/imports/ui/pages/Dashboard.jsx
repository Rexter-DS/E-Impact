import { withTracker } from 'meteor/react-meteor-data';
import React from 'react';
import PropTypes from 'prop-types';
import { Dimmer, Loader } from 'semantic-ui-react';
import { Trips } from '../../api/trip/TripCollection';
import { Users } from '../../api/user/UserCollection';
import DashboardContent from '../components/DashboardContent';
import Footer from '../components/Footer';


// This page contains the graphs that will visualize the user's data in a more meaningful way.
// The page waits for the data to load first and shows a loading page. Then once the collection is ready, we show the dashboard.
function Dashboard(
    {
      tripReady,
      userReady,
      milesSavedTotal,
      milesSavedPerDay,
      modesOfTransport,
      userProfile,
      ghgReducedPerDay,
      fuelSavedPerDay,
    },
    ) {

  return ((tripReady && userReady) ?
      <div>
          <DashboardContent
            milesSavedTotal={milesSavedTotal}
            milesSavedPerDay={milesSavedPerDay}
            modesOfTransport={modesOfTransport}
            userProfile={userProfile}
            ghgReducedPerDay={ghgReducedPerDay}
            fuelSavedPerDay={fuelSavedPerDay}
          />
          <Footer id={'dashboard-footer'}/>
      </div> :
      <Dimmer active>
        <Loader>Loading Data</Loader>
      </Dimmer>
  );
}

Dashboard.propTypes = {
  milesSavedTotal: PropTypes.number,
  milesSavedPerDay: PropTypes.object,
  modesOfTransport: PropTypes.object,
  userProfile: PropTypes.any,
  ghgReducedPerDay: PropTypes.object,
  fuelSavedPerDay: PropTypes.object,
  tripReady: PropTypes.bool.isRequired,
  userReady: PropTypes.bool.isRequired,
};

export default withTracker(({ match }) => {
  const tripSubscribe = Trips.subscribeTrip();
  const userSubscribe = Users.subscribeUser();
  const username = match.params._id;
  const milesSavedTotal = Trips.getMilesSavedTotal(username);
  const milesSavedPerDay = Trips.getMilesSavedPerDay(username);
  const modesOfTransport = Trips.getModesOfTransport(username);
  const userProfile = Users.getUserProfile(username);
  const ghgReducedPerDay = Trips.getGHGReducedPerDay(username, (userSubscribe.ready()) ? userProfile.autoMPG : 1);
  const fuelSavedPerDay = Trips.getFuelSavedPerDay(username, (userSubscribe.ready()) ? userProfile.autoMPG : 1);
  return {
    tripReady: tripSubscribe.ready(),
    userReady: userSubscribe.ready(),
    milesSavedTotal,
    milesSavedPerDay,
    modesOfTransport,
    userProfile,
    ghgReducedPerDay,
    fuelSavedPerDay,
  };
})(Dashboard);
