import React from 'react';
import { Grid, Segment, Header } from 'semantic-ui-react';
import { AutoForm, ErrorsField, NumField, SelectField, SubmitField } from 'uniforms-semantic';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Trips } from '../../api/trip/TripCollection';
import NavBar from '../components/NavBar';

/** Create a schema to specify the structure of the data to appear in the form. */
const formSchema = new SimpleSchema({
  distance: Number,
  mode: {
    type: String,
    allowedValues: ['Telework', 'Public Transportation', 'Bike', 'Walk', 'Carpool', 'Electric Vehicle'],
    defaultValue: 'Telework' },
  mpg: Number,
});

const bridge = new SimpleSchema2Bridge(formSchema);

/** Renders the Page for adding a document. */
class AddTrip extends React.Component {

  /** On submit, insert the data. */
  submit(data, formRef) {
    const { distance, mode, mpg } = data;
    const owner = Meteor.user().username;
    Trips.define({ distance, mode, mpg, owner },
        (error) => {
          if (error) {
            swal('Error', error.message, 'error');
          } else {
            swal('Success', 'Item added successfully', 'success');
            formRef.reset();
          }
        });
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  render() {
    let fRef = null;
    return (
        <div>
          <NavBar/>
          <Grid container centered>
            <Grid.Column>
              <Header as="h2" textAlign="center">Add Trip</Header>
              <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => this.submit(data, fRef)} >
                <Segment>
                  <NumField name='distance' label={'Distance traveled (miles)'}/>
                  <SelectField name='mode' label={'Mode of transportation'}/>
                  <NumField name='mpg' label={'Vehicle MPG'}/>
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

