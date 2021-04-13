import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Table, Button, Confirm } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Trips, tripPublications } from '../../api/trip/TripCollection';
import { Users } from '../../api/user/UserCollection';

/** Renders a single row in the List Trip table. See pages/ListTrip.jsx. */
const TripItem = (props) => {
  let gallons;
  const tripMpg = props.trip.mpg > 0 ? props.trip.mpg : Users.getUserProfile(props.trip.owner)?.autoMPG.isDefined() ? Users.getUserProfile(props.trip.owner).autoMPG : 25;
  if (props.trip.mode === 'Gas Car' || props.trip.mode === 'Carpool') {
    gallons = (props.trip.distance !== 0 ? ((props.trip.distance / tripMpg)) : 0);
  } else {
    gallons = -(props.trip.distance !== 0 ? ((props.trip.distance / tripMpg)) : 0);
  }
  const ghg = gallons === 0 ? 0 : gallons * 19.6;

  const gStyle = gallons > 0 ? { color: 'red' } : { color: 'green' };

  const [confirmState, setConfirmState] = useState(false);

  function handleClickDel() {
    Trips.removeIt(props.trip);
  }

  function handleCancel() {
    setConfirmState(false);
  }

  function handleConfirmDel() {
    handleClickDel();
    setConfirmState(false);
  }

  function openConfirm() {
    setConfirmState(true);
  }

  function abs(val) {
    if (val < 0) {
      return -1 * val;
    }
    return val;
  }
  return (
      <Table.Row>
        <Table.Cell className='daily-table-data'>{props.trip.date.toLocaleDateString()}</Table.Cell>
        <Table.Cell className='daily-table-data'>{props.trip.mode}</Table.Cell>
        <Table.Cell className='daily-table-data'>{props.trip.distance} mi</Table.Cell>
        <Table.Cell className='daily-table-data'>{props.trip.mpg}</Table.Cell>
        <Table.Cell style={gStyle}>{gallons === 0 ? 0 : `${abs(gallons).toFixed(2)} gal`}</Table.Cell>
        <Table.Cell style={gStyle}>{ghg === 0 ? 0 : `${abs(ghg).toFixed(2)} lbs`}</Table.Cell>
        <Table.Cell><Button negative circular icon='x' onClick={openConfirm}/><Confirm
            open={confirmState}
            header='Delete Trip?'
            onCancel={handleCancel}
            onConfirm={handleConfirmDel}
        /></Table.Cell>
      </Table.Row>
  );
};

/** Require a document to be passed to this component. */
TripItem.propTypes = {
  trip: PropTypes.object.isRequired,
  readySaved: PropTypes.bool.isRequired,
  savedTrips: PropTypes.array.isRequired,
};

export default withTracker(() => {
  const { owner } = useParams();
  const readySaved = Meteor.subscribe(tripPublications.tripCommunity).ready();
  const allTrips = Trips.find({ owner }).fetch();
  return {
    readySaved,
    allTrips,
  };
})(TripItem);
