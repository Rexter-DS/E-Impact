import { withTracker } from 'meteor/react-meteor-data';
import React from 'react';
import PropTypes from 'prop-types';
import { Dimmer, Loader } from 'semantic-ui-react';
import { Trips } from '../../api/trip/TripCollection';
import { Users } from '../../api/user/UserCollection';
import ChoseScenario from '../components/ChoseScenario';
import WhatIfContent from '../components/WhatIfContent';

// This page contains the graphs that will visualize the user's data in a more meaningful way.
// The page waits for the data to load first and shows a loading page. Then once the collection is ready, we show the dashboard.
function WhatIf(
    {
        tripReady,
        userReady,
        milesSavedTotal,
        milesSavedPerDay,
        modesOfTransport,
        userProfile,
        ghgProducedTotal,
        ghgReducedPerDay,
        fuelSavedPerDay,
    },
) {

    return ((tripReady && userReady) ?
            <div style={{ width: '100%' }}>
                <ChoseScenario
                    milesSavedTotal={milesSavedTotal}
                    milesSavedPerDay={milesSavedPerDay}
                    modesOfTransport={modesOfTransport}
                    userProfile={userProfile}
                    ghgProducedTotal={ghgProducedTotal}
                    ghgReducedPerDay={ghgReducedPerDay}
                    fuelSavedPerDay={fuelSavedPerDay}
                />
                <WhatIfContent
                    milesSavedTotal={milesSavedTotal}
                    milesSavedPerDay={milesSavedPerDay}
                    modesOfTransport={modesOfTransport}
                    userProfile={userProfile}
                    ghgProducedTotal={ghgProducedTotal}
                    ghgReducedPerDay={ghgReducedPerDay}
                    fuelSavedPerDay={fuelSavedPerDay}
                    // milesSavedTotalWI={milesSavedTotal}
                    milesSavedPerDayWI={milesSavedPerDay}
                    modesOfTransportWI={modesOfTransport}
                    // ghgProducedTotalWI={ghgProducedTotal}
                    ghgReducedPerDayWI={ghgReducedPerDay}
                    fuelSavedPerDayWI={fuelSavedPerDay}
                />
            </div> :
            <Dimmer active>
                <Loader>Loading Data</Loader>
            </Dimmer>
    );
}

WhatIf.propTypes = {
    milesSavedTotal: PropTypes.number,
    milesSavedPerDay: PropTypes.object,
    modesOfTransport: PropTypes.object,
    userProfile: PropTypes.any,
    ghgProducedTotal: PropTypes.string,
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
    const ghgProducedTotal = Trips.getGHGProducedTotal(username, (userSubscribe.ready()) ? userProfile.autoMPG : 1);
    const ghgReducedPerDay = Trips.getGHGReducedPerDay(username, (userSubscribe.ready()) ? userProfile.autoMPG : 1);
    const fuelSavedPerDay = Trips.getFuelSavedPerDay(username, (userSubscribe.ready()) ? userProfile.autoMPG : 1);
    return {
        tripReady: tripSubscribe.ready(),
        userReady: userSubscribe.ready(),
        milesSavedTotal,
        milesSavedPerDay,
        modesOfTransport,
        userProfile,
        ghgProducedTotal,
        ghgReducedPerDay,
        fuelSavedPerDay,
    };
})(WhatIf);
