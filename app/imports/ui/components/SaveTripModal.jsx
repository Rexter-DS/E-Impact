import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Button, Header, Modal, Segment } from 'semantic-ui-react';
import { AutoForm, ErrorsField, SubmitField, TextField } from 'uniforms-semantic';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import PropTypes from 'prop-types';
import { SavedTrips } from '../../api/trip/SavedTripCollection';

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
    setOpen(false);
  }

  const formSchema1 = new SimpleSchema({
    description: {
      type: String,
      defaultValue: `Saved Trip ${new Date().toDateString()}`,
    },
  });
  const bridge = new SimpleSchema2Bridge(formSchema1);
  let fRef = null;

  return (
      <Modal
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
          open={open}
          trigger={<Button className='daily-save-button'>Save Trip</Button>}
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
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => handleSubmit(data, fRef)}>
            <Segment>
              <TextField name={'description'}/>
              <SubmitField value='Submit'/>
              <ErrorsField/>
            </Segment>
          </AutoForm>
        </Modal.Content>
        <Modal.Actions>
          <Button color='black' onClick={() => setOpen(false)}>
            No Thanks
          </Button>
        </Modal.Actions>
      </Modal>
  );
};

/** Require a document to be passed to this component. */
SaveTripModal.propTypes = {
  trip: PropTypes.object.isRequired,
};

export default SaveTripModal;
