import React from 'react';
import { Grid, Header, Icon, Segment } from 'semantic-ui-react';
import { AutoForm, DateField, ErrorsField, NumField, SelectField, SubmitField } from 'uniforms-semantic';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Trips } from '../../api/trip/TripCollection';
import SidebarVisible from '../components/SideBar';

/** Create a schema to specify the structure of the data to appear in the form. */
const formSchema = new SimpleSchema({
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

const bridge = new SimpleSchema2Bridge(formSchema);

/** Renders the Page for adding a document. */
class AddTrip extends React.Component {

  /** On submit, insert the data. */
  submit(data, formRef) {
    const { date, mode, distance, mpg } = data;
    const owner = Meteor.user().username;
    const county = Meteor.user().profile.county;
    if (Trips.defineWithMessage({ date, mode, distance, mpg, owner, county })) {
      formRef.reset();
    }
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  render() {
    let fRef = null;
    return (
        <div id='add-trip-container'>
          <SidebarVisible/>
          <Grid container centered>
            <Grid.Column>
              <Header as="h2" textAlign="center">Add Trip</Header>
              <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => this.submit(data, fRef)}>
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
            </Grid.Column>
          </Grid>
        </div>
    );
  }
}

export default AddTrip;
