import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Grid, Header, Icon, Loader, Segment, Button } from 'semantic-ui-react';
import { AutoForm, DateField, ErrorsField, NumField, SelectField, SubmitField } from 'uniforms-semantic';
import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import PropTypes from 'prop-types';
import { tripPublications, Trips } from '../../api/trip/TripCollection';
import { savedTripPublications, SavedTrips } from '../../api/trip/SavedTripCollection';
import { Users } from '../../api/user/UserCollection';
import SidebarVisible from '../components/SideBar';
import DeleteSavedModal from '../components/DeleteSavedModal';

const AddTrip = (props) => {

  /** Create a schema to specify the structure of the data to appear in the form. */
  // const userSavedTrips = _.filter(SavedTrips, (trip) => trip.owner === Meteor.user()?.username);
  const userSavedTrips = SavedTrips.find({ owner: props.username }).fetch();
  let descList;
  if (userSavedTrips.length === 0) {
    descList = [''];
  } else {
    descList = _.map(userSavedTrips, (trip) => trip?.description);
  }

  const formSchema1 = new SimpleSchema({
    date: {
      type: Date,
      defaultValue: new Date(),
    },
    mode: {
      type: String,
      allowedValues: ['Bike', 'Carpool', 'Electric Vehicle', 'Gas Car', 'Public Transportation', 'Telework', 'Walk'],
      defaultValue: 'Gas Car',
    },
    distance: Number,
    mpg: Number,
  });
  const formSchema2 = new SimpleSchema({
    date: {
      type: Date,
      defaultValue: new Date(),
    },
    desc: {
      type: String,
      allowedValues: descList,
    },
  });
  const bridge1 = new SimpleSchema2Bridge(formSchema1);
  const bridge2 = new SimpleSchema2Bridge(formSchema2);

/** Renders the Page for adding a document. */

  /** On submit, insert the data. */
  function submit(data, formRef) {
    const { date, mode, distance, mpg } = data;
    const owner = Meteor.user().username;
    const county = Meteor.user().profile.county;
    if (Trips.defineWithMessage({ date, mode, distance, mpg, owner, county })) {
      formRef.reset();
    }
  }

  function submitSaved(data, formRef) {
    const { date, desc } = data;
    const savedTrip = _.filter(userSavedTrips, (trip) => trip.description === desc)[0];
    const { mode, distance, mpg } = savedTrip;
    const owner = Meteor.user().username;
    const county = Meteor.user().profile.county;
    console.log('Add Trip submit saved');
    console.log(date, desc, savedTrip, mode, distance, mpg);
    if (Trips.defineWithMessage({ date, mode, distance, mpg, owner, county })) {
      formRef.reset();
    }
  }

  function deleteSavedTrips() {
    function removeTrip(trip, index) {
      SavedTrips.removeIt(trip);
    }
    SavedTrips.find({}).fetch().forEach(removeTrip);
    console.log(`add trip: deleteSavedTrips(): ${SavedTrips.find({}).fetch()}`);
  }

  /* Styling */
  if (props.userReady) {
    const addTripForms = document.getElementsByClassName('add-trip-form');
    if (props.userProfile.theme === 'dark') {
      for (let i = 0; i < addTripForms.length; i++) {
        addTripForms[i].classList.add('dark-trip-form');
      }
    } else {
      for (let i = 0; i < addTripForms.length; i++) {
        addTripForms[i].classList.remove('dark-trip-form');
      }
    }
  }

  let fRef = null;
  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
    return (!props.readyTrips || !props.readySaved || !props.userReady) ? <Loader active>Loading Page</Loader> : (
        <div id='add-trip-container'>
          <SidebarVisible theme={props.userProfile.theme}/>
          <Grid container centered>
            <Grid.Column>
              <Header className='add-trip-header' as="h2" textAlign="center">Add New Trip</Header>
              <AutoForm ref={ref => { fRef = ref; }} schema={bridge1} onSubmit={data => submit(data, fRef)}>
                <Segment className='add-trip-form'>
                  <DateField name='date'/>
                  <SelectField name='mode' label={'Mode of transportation'}/>
                  <Icon name='question circle outline'/>If teleworking, enter information based on your usual commute to
                  work.<br/><br/>
                  <NumField name='distance' label={'Distance traveled (miles)'}/>
                  <NumField name='mpg' label={'Vehicle MPG'}/>
                  <Icon name='question circle outline'/>If using alternative modes of transportation, enter the mpg of
                  your internal combustion engine vehicle.<br/><br/>
                  <SubmitField value='Submit'/>
                  <ErrorsField/>
                </Segment>
              </AutoForm>
              <Header className='add-trip-header' as="h2" textAlign="center">OR Add Saved Trip</Header>
              <AutoForm ref={ref => { fRef = ref; }} schema={bridge2} onSubmit={data => submitSaved(data, fRef)}>
                <Segment className='add-trip-form'>
                  <DateField name='date'/>
                  <SelectField name='desc' label={'Saved Trips'}/>
                  <p><Icon name='question circle outline'/>You can simply select your saved trip here to skip adding the same details again and again.<br/>
                  {'To save more trips, click the "Save Trip" button on the Daily page.'}</p>
                  <SubmitField value='Submit'/>
                  <ErrorsField/>
                </Segment>
              </AutoForm>
              <Grid.Row><DeleteSavedModal/></Grid.Row>
            </Grid.Column>
          </Grid>
        </div>
    );
};

AddTrip.propTypes = {
  username: PropTypes.string,
  userProfile: PropTypes.object,
  userReady: PropTypes.bool.isRequired,
  readyTrips: PropTypes.bool.isRequired,
  readySaved: PropTypes.bool.isRequired,
  trips: PropTypes.array.isRequired,
  savedTrips: PropTypes.array.isRequired,
};

export default withTracker(() => {
  const username = Meteor.user()?.username;
  const userProfile = Users.getUserProfile(username);
  const userReady = Users.subscribeUser().ready();
  const readyTrips = Meteor.subscribe(tripPublications.trip).ready() && username !== undefined;
  const readySaved = Meteor.subscribe(savedTripPublications.savedTrip).ready() && username !== undefined;
  const trips = Trips.find({}).fetch();
  const savedTrips = SavedTrips.find({}).fetch();
  return {
    username,
    userProfile,
    userReady,
    readyTrips,
    readySaved,
    trips,
    savedTrips,
  };
})(AddTrip);
