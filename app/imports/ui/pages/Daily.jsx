import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Menu, Button, Table, Grid, Loader } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { _ } from 'meteor/underscore';
import SidebarVisible from '../components/SideBar';
import { Trips, tripPublications, tripModes } from '../../api/trip/TripCollection';
import TripItem from '../components/TripItem';

class Daily extends React.Component {

  render() {
    return this.props.ready ? this.renderPage() : <Loader active>Loading data</Loader>;
  }

  renderPage() {
    // const miles = this.props.trips[0].distance;
    const month = 3; // march
    const monthTrips = _.filter(this.props.trips, (trip) => trip.date.getMonth() + 1 === month).sort((a, b) => ((a.date < b.date) ? 1 : -1))
    let monthlySum = 0;
    for (let i = 0; i < monthTrips.length; i++) {
      const add = (monthTrips[i].distance / monthTrips[i].mpg) * 19.6;
      if (!isNaN(add) && isFinite(add)) {
        monthlySum += add;
      }
    }
    const myTrips = _.filter(this.props.trips, (trip) => trip.owner === this.props.username);

    return (
        <div id='daily-container' style={{ marginLeft: '150px' }}>
          <SidebarVisible/>
          <Menu borderless id="daily-top">
            <Grid style={{ width: '100%' }}>
              <Grid.Column width={4} verticalAlign='bottom'><Menu.Item className='daily-header-sums'>February
                                                                                                     2021</Menu.Item></Grid.Column>
              <Grid.Column width={6} textAlign='center'><Menu.Item className='daily-header-sums'>Total GHG Produced: {monthlySum.toFixed(2)}</Menu.Item></Grid.Column>

              <Grid.Column width={4} textAlign='center'><Menu.Item className='daily-header-sums'></Menu.Item></Grid.Column>
              <Grid.Column width={2} verticalAlign='bottom'><Menu.Item position='right'>
                <Button className='daily-add-button' href={'#/addTrip'}>Add</Button>
              </Menu.Item></Grid.Column>
            </Grid>
          </Menu>
          <Table fixed className='daily-table'>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell className='daily-table-header'>Date</Table.HeaderCell>
                <Table.HeaderCell className='daily-table-header'>County</Table.HeaderCell>
                <Table.HeaderCell className='daily-table-header'>Distance</Table.HeaderCell>
                <Table.HeaderCell className='daily-table-header'>Mode of Transportation</Table.HeaderCell>
                <Table.HeaderCell className='daily-table-header'>mpg</Table.HeaderCell>
                <Table.HeaderCell className='daily-table-header'>Gallons used</Table.HeaderCell>
                <Table.HeaderCell className='daily-table-header'>GHG produced</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {monthTrips.map((trip) => <TripItem key={trip._id} trip={trip} />)}
            </Table.Body>
          </Table>
        </div>
    );
  }
}

Daily.propTypes = {
  ready: PropTypes.bool.isRequired,
  trips: PropTypes.array.isRequired,
  username: PropTypes.string,
};

export default withTracker(() => {
  const username = Meteor.user()?.username;
  const ready = Meteor.subscribe(tripPublications.tripCommunity).ready() && username !== undefined;
  const trips = Trips.find({}).fetch();
  return {
    ready,
    trips,
    username,
  };
})(Daily);
