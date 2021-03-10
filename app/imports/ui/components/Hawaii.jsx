import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Grid, Icon, Loader, Progress, Statistic } from 'semantic-ui-react';
import { _ } from 'lodash';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Trips } from '../../api/trip/TripCollection';

class Hawaii extends React.Component {
  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  renderPage() {
    const totalUsers = Meteor.users.find({ 'profile.county': 'Hawaii' }).count();

    const carDistances = _.map(Trips.find({ county: 'Hawaii', mode: 'Gas Car' }).fetch(), 'distance');
    const carMpgs = _.map(Trips.find({ county: 'Hawaii', mode: 'Gas Car' }).fetch(), 'mpg');
    const fuelUsed = _.zipWith(carDistances, carMpgs, (distance, mpg) => distance / mpg);
    const totalFuelUsed = _.sum(fuelUsed).toFixed(2);
    const totalGhgProduced = (totalFuelUsed * 19.6).toFixed(2);

    const otherDistances = _.map(Trips.find({ county: 'Hawaii', mode: { $not: 'Gas Car' } }).fetch(), 'distance');
    const totalMilesSaved = _.sum(otherDistances).toFixed(2);
    const otherMpgs = _.map(Trips.find({ county: 'Hawaii', mode: { $not: 'Gas Car' } }).fetch(), 'mpg');
    const fuelSaved = _.zipWith(otherDistances, otherMpgs, (distance, mpg) => distance / mpg);
    const totalFuelSaved = _.sum(fuelSaved).toFixed(2);
    const totalGhgReduced = (totalFuelSaved * 19.6).toFixed(2);

    return (
        <Grid centered>
          <Grid.Row>
            <Grid.Column as="h2" textAlign='center'>Hawaii County</Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={3} textAlign='center'> <Statistic>
              <Statistic.Value>
                <Icon name='users'/>{totalUsers}
              </Statistic.Value>
              <Statistic.Label>users</Statistic.Label>
            </Statistic>
            </Grid.Column>
            <Grid.Column width={5} textAlign='center'> <Statistic>
              <Statistic.Value><Icon name='car'/>{totalMilesSaved}</Statistic.Value>
              <Statistic.Label>vehicle miles traveled (VMT) reduced</Statistic.Label>
            </Statistic>
            </Grid.Column>
            <Grid.Column width={5}>
              <Progress value={totalMilesSaved} total='20000' progress='percent'
                        label="2021 GOAL: 20,000 VMT REDUCED" color="blue"/></Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={3} textAlign='center'> <Statistic color="red">
              <Statistic.Value><Icon name='fire'/>{totalFuelUsed}</Statistic.Value>
              <Statistic.Label>gallons of gas used</Statistic.Label>
            </Statistic>
            </Grid.Column>
            <Grid.Column width={5} textAlign='center'> <Statistic>
              <Statistic.Value><Icon name='fire'/>{totalFuelSaved}</Statistic.Value>
              <Statistic.Label>gallons of gas saved</Statistic.Label>
            </Statistic>
            </Grid.Column>
            <Grid.Column width={5}>
              <Progress value={totalFuelSaved} total='1000' progress='percent'
                        label="2021 GOAL: 1,000 GALLONS OF GAS SAVED" color="blue"/></Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={3} textAlign='center'> <Statistic color="red">
              <Statistic.Value><Icon name='cloud'/>{totalGhgProduced}</Statistic.Value>
              <Statistic.Label>pounds of C02 produced</Statistic.Label>
            </Statistic>
            </Grid.Column>
            <Grid.Column width={5} textAlign='center'> <Statistic>
              <Statistic.Value><Icon name='cloud'/>{totalGhgReduced}</Statistic.Value>
              <Statistic.Label>pounds of CO2 reduced</Statistic.Label>
            </Statistic>
            </Grid.Column>
            <Grid.Column width={5}>
              <Progress value={totalGhgReduced} total='10000' progress='percent'
                        label="2021 GOAL: 10,000 POUNDS OF CO2 REDUCED" color="blue"/></Grid.Column>
          </Grid.Row>
        </Grid>
    );
  }
}

/** Require an array of Trip documents in the props. */
Hawaii.propTypes = {
  trips: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Trip documents.
  const subscription = Trips.subscribeTripCommunity();
  return {
    trips: Trips.find({}).fetch(),
    ready: subscription.ready(),
  };
})(Hawaii);
