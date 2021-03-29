import { Meteor } from 'meteor/meteor';
import React, { useState } from 'react';
import { Button, Header, Modal, Form } from 'semantic-ui-react';

import { SavedTrips } from '../../api/trip/SavedTripCollection';
import { Trips } from '../../api/trip/TripCollection';

const SaveTripModal = (props) => {
  const [open, setOpen] = React.useState(false);

  function handleSubmit(data) {
    const { description } = data;
    const mode = props.trip.mode;
    const distance = props.trip.distance;
    const mpg = props.trip.mpg;
    const owner = Meteor.user().username;
    const county = Meteor.user().profile.county;
    SavedTrips.defineWithMessage({ description, mode, distance, mpg, owner, county });
  }

  return (
      <Modal
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
          open={open}
          trigger={<Button>Save Trip</Button>}
      >
        <Modal.Header>Save Trip</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Header>Keep for Later</Header>
            <p>
              You can save this trip to your saved trips to make it quicker to add the next time
              you make this same trip.
            </p>
            <Header>Trip Details</Header>
            <p>Distance Travelled: {props.trip.distance}</p>
            <p>Mode of transportation: {props.trip.mode}</p>
            <p>Vehicle mpg: {props.trip.mpg}</p>
          </Modal.Description>
          <Form onSubmit={handleSubmit}>
              <Form.Input
                  placeholder={'\"Work to Home\"'}
                  name='description'
              />
              <Form.Button content='Submit' />
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button color='black' onClick={() => setOpen(false)}>
            Nope
          </Button>
          <Button
              content="Yep, save it!"
              labelPosition='right'
              icon='checkmark'
              onClick={() => setOpen(false)}
              positive
          />
        </Modal.Actions>
      </Modal>
  );
};

export default SaveTripModal;
