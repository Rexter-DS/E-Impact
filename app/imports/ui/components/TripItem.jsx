import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { Table, Button, Confirm } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Trips } from '../../api/trip/TripCollection';
import { Users } from '../../api/user/UserCollection';

/** Renders a single row in the List Trip table. See pages/ListTrip.jsx. */
const TripItem = (props) => {
  let gallons;
  const tripMpg = props.trip.mpg > 0 ? props.trip.mpg : Users.getUserProfile(Meteor.user().username)?.autoMPG.isDefined() ? Users.getUserProfile(Meteor.user().username).autoMPG : 25;
  if (props.trip.mode === 'Gas Car' || props.trip.mode === 'Carpool') {
    gallons = (props.trip.distance !== 0 ? ((props.trip.distance / tripMpg)) : 0);
  } else {
    gallons = -(props.trip.distance !== 0 ? ((props.trip.distance / tripMpg)) : 0);
  }
  const ghg = gallons === 0 ? 0 : gallons * 19.6;

  const galStyle = gallons > 0 ? { color: 'red' } : { color: 'green' };
  const ghgStyle = ghg > 0 ? { color: 'red' } : { color: 'green' };

  const [confirmState, setConfirmState] = useState(false);

  function handleClickDel() {
    Trips.removeIt(props.trip);
  }

  function handleCancel() {
    setConfirmState(false);
  }

  function handleConfirm() {
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
        <Table.Cell>{props.trip.date.toLocaleDateString()}</Table.Cell>
        <Table.Cell>{props.trip.mode}</Table.Cell>
        <Table.Cell>{props.trip.distance}</Table.Cell>
        <Table.Cell>{props.trip.mpg}</Table.Cell>
        <Table.Cell style={galStyle}>{gallons === 0 ? 0 : `${abs(gallons).toFixed(2)} gal`}</Table.Cell>
        <Table.Cell style={ghgStyle}>{ghg === 0 ? 0 : `${abs(ghg).toFixed(2)} lbs`}</Table.Cell>
        <Table.Cell><Button negative circular icon='x' onClick={openConfirm}></Button><Confirm
            open={confirmState}
            header='Delete Trip?'
            onCancel={handleCancel}
            onConfirm={handleConfirm}
        /></Table.Cell>
      </Table.Row>
  );
}

/** Require a document to be passed to this component. */
TripItem.propTypes = {
  trip: PropTypes.object.isRequired,
};

export default TripItem;
