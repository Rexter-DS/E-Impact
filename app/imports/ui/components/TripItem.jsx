import React, { useEffect, useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Table, Button, Modal, Header } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Trips } from '../../api/trip/TripCollection';
import { savedTripPublications, SavedTrips } from '../../api/trip/SavedTripCollection';
import { Users } from '../../api/user/UserCollection';
import SaveTripModal from './SaveTripModal';

/** Renders a single row in the List Trip table. See pages/ListTrip.jsx. */
const TripItem = (props) => {
  let gallons;
  // eslint-disable-next-line no-nested-ternary
  const tripMpg = props.trip.mpg > 0 ? props.trip.mpg : Users.getUserProfile(Meteor.user().username)?.autoMPG.isDefined() ? Users.getUserProfile(Meteor.user().username).autoMPG : 25;
  if (props.trip.mode === 'Gas Car' || props.trip.mode === 'Carpool') {
    gallons = (props.trip.distance !== 0 ? ((props.trip.distance / tripMpg)) : 0);
  } else {
    gallons = -(props.trip.distance !== 0 ? ((props.trip.distance / tripMpg)) : 0);
  }
  const ghg = gallons === 0 ? 0 : gallons * 19.6;

  const gStyle = gallons > 0 ? { color: 'red' } : { color: 'green' };

  const [confirmState, setConfirmState] = useState(false);

  const userSavedTrips = SavedTrips.find({ owner: props.username }, {}).fetch();
  let saved = false;
  let tripDesc = '';
  for (let i = 0; i < userSavedTrips.length; i++) {
    const { distance, mpg, mode, passenger } = userSavedTrips[i];
    if (distance === props.trip.distance &&
        mpg === props.trip.mpg &&
        mode === props.trip.mode &&
        passenger === props.trip.passenger) {
      saved = true;
      tripDesc = userSavedTrips[i].description;
      break;
    }
  }

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

  useEffect(() => {
    if (document.getElementById('save-trip-modal')) {
      const cardModals = document.getElementsByClassName('card-modal');
      if (props.userProfile.theme === 'dark') {
        for (let i = 0; i < cardModals.length; i++) {
          cardModals[i].classList.add('dark-modal');
        }
      } else {
        for (let i = 0; i < cardModals.length; i++) {
          cardModals[i].classList.remove('dark-modal');
        }
      }
    }
  }, [confirmState, setConfirmState, props.userProfile]);

  return (
      <Table.Row>
        <Table.Cell className='daily-table-data'>{props.trip.date.toLocaleDateString()}</Table.Cell>
        <Table.Cell className='daily-table-data'>{props.trip.mode}</Table.Cell>
        <Table.Cell className='daily-table-data'>{props.trip.distance} mi</Table.Cell>
        <Table.Cell className='daily-table-data'>{props.trip.mpg}</Table.Cell>
        <Table.Cell style={gStyle}>{gallons === 0 ? 0 : `${abs(gallons).toFixed(2)} gal`}</Table.Cell>
        <Table.Cell style={gStyle}>{ghg === 0 ? 0 : `${abs(ghg).toFixed(2)} lbs`}</Table.Cell>
        <Table.Cell>
          <Modal
              id='save-trip-modal'
              onClose={() => setConfirmState(false)}
              onOpen={() => setConfirmState(true)}
              open={confirmState}
              trigger={<Button negative circular icon='x' onClick={openConfirm}/>}
          >
            <Modal.Header className='card-modal'>Delete Trip?</Modal.Header>
            <Modal.Content className='card-modal'>
              <Modal.Description className='card-modal'>
                <Header className='card-modal'>Are you sure?</Header>
              </Modal.Description>
            </Modal.Content>
            <Modal.Actions className='card-modal'>
              <Button onClick={() => handleCancel()}>
                Cancel
              </Button>
              <Button className='card-button' onClick={() => handleConfirmDel()}>
                Yes
              </Button>
            </Modal.Actions>
          </Modal>
        </Table.Cell>
        {saved ? <Table.Cell className='daily-table-data'>{`"${tripDesc}"`}</Table.Cell> :
            <Table.Cell>
              <SaveTripModal trip={props.trip} userProfile={props.userProfile}/>
            </Table.Cell>}
      </Table.Row>
  );
};

/** Require a document to be passed to this component. */
TripItem.propTypes = {
  trip: PropTypes.object.isRequired,
  username: PropTypes.string.isRequired,
  userProfile: PropTypes.object,
  readySaved: PropTypes.bool.isRequired,
  savedTrips: PropTypes.array.isRequired,
};

export default withTracker(() => {
  const username = Meteor.user()?.username;
  const userProfile = Users.getUserProfile(username);
  const readySaved = Meteor.subscribe(savedTripPublications.savedTrip).ready() && username !== undefined;
  const savedTrips = SavedTrips.find({}).fetch();
  return {
    readySaved,
    savedTrips,
    username,
    userProfile,
  };
})(TripItem);
