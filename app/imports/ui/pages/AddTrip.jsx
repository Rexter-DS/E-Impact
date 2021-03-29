import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Grid, Header, Icon, Loader, Segment } from 'semantic-ui-react';
import { AutoForm, DateField, ErrorsField, NumField, SelectField, SubmitField } from 'uniforms-semantic';
import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { tripPublications, Trips } from '../../api/trip/TripCollection';
import { SavedTrips } from '../../api/trip/SavedTripCollection';
import SidebarVisible from '../components/SideBar';

const AddTrip = (props) => {

  /** Create a schema to specify the structure of the data to appear in the form. */
  // const userSavedTrips = _.filter(SavedTrips, (trip) => trip.owner === Meteor.user()?.username);
  const userSavedTrips = SavedTrips.find({owner: Meteor.user()?.username})
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
    const savedTrip = _.filter(userSavedTrips, (trip) => trip.description === desc)
    const { mode, distance, mpg } = savedTrip;
    const owner = Meteor.user().username;
    const county = Meteor.user().profile.county;
    if (Trips.defineWithMessage({ date, mode, distance, mpg, owner, county })) {
      formRef.reset();
    }
  }

  let fRef = null;
  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
    return !props.ready ? <Loader active>Loading data</Loader> : (
        <div id='add-trip-container'>
          <SidebarVisible/>
          <Grid container centered>
            <Grid.Column>
              <Header as="h2" textAlign="center">Add Trip</Header>
              <AutoForm ref={ref => { fRef = ref; }} schema={bridge1} onSubmit={data => submit(data, fRef)}>
                <Segment>
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
              <Header as="h2" textAlign="center">OR</Header>
              <AutoForm ref={ref => { fRef = ref; }} schema={bridge2} onSubmit={data => submitSaved(data, fRef)}>
                <Segment>
                  <DateField name='date'/>
                  <SelectField name='desc' label={'Saved Trips'}/>
                  <Icon name='question circle outline'/>Something about how to save trips.<br/><br/>
                  <SubmitField value='Submit'/>
                  <ErrorsField/>
                </Segment>
              </AutoForm>
            </Grid.Column>
          </Grid>
        </div>
    );
}

export default withTracker(() => {
  const username = Meteor.user()?.username;
  const ready = Meteor.subscribe(tripPublications.trip).ready() && username !== undefined;
  const trips = Trips.find({}).fetch();
  return {
    ready,
    trips,
    username,
  };
})(AddTrip);
