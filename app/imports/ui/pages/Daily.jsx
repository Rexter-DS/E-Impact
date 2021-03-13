import React, { useState } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Menu, Button, Table, Grid, Loader, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { _ } from 'meteor/underscore';
import SideBar from '../components/SideBar';
import { Trips, tripPublications } from '../../api/trip/TripCollection';
import TripItem from '../components/TripItem';
import Footer from '../components/Footer';

const Daily = (props) => {
  const monthString = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const today = new Date();
  const [currentMonthYr, setCurrentMonthYr] = useState([today.getMonth(), today.getFullYear()]);
  const monthTrips = _.filter(props.trips, (trip) => trip.date.getMonth() === currentMonthYr[0] && trip.date.getFullYear() === currentMonthYr[1]).sort((a, b) => ((a.date < b.date) ? 1 : -1));
  let monthlySum = 0;
  for (let i = 0; i < monthTrips.length; i++) {
    const tripMpg = monthTrips[i].mpg > 0 ? monthTrips[i].mpg : 25;
    const add = (monthTrips[i].distance / tripMpg) * 19.6;
    if (!isNaN(add) && isFinite(add)) {
      if (monthTrips[i].mode === 'Gas Car' || monthTrips[i].mode === 'Carpool') {
        monthlySum += add;
      } else {
        monthlySum -= add;
      }
    }
  }
  const monthlySumStyle = monthlySum > 0 ? { color: 'red' } : { color: 'green' };

  function handleClickNext() {
    const m = (currentMonthYr[0] + 1) % 12;
    let y = currentMonthYr[1];
    if (m === 0) {
      y = currentMonthYr[1] + 1;
    }
    setCurrentMonthYr([m, y])
  }

  function handleClickPrev() {
    const m = (currentMonthYr[0] + 11) % 12;
    let y = currentMonthYr[1];
    if (m === 11) {
      y -= 1;
    }
    setCurrentMonthYr([m, y])
  }

  function handleClickToday() {
    setCurrentMonthYr([today.getMonth(), today.getFullYear()]);
  }

  function abs(val) {
    if (val < 0) {
      return -1 * val;
    }
    return val;
  }

  return !props.ready ? <Loader active>Loading data</Loader> :
        (
            <div id='daily-container'
                 style={{ marginLeft: '150px' }}>
              <SideBar/>
              <Menu borderless
                    id="daily-top">
                <Menu.Item>
                <Button className='daily-today-button' style={{ fontSize: '16px' }} onClick={handleClickToday}>
                  This Month
                </Button>
                </Menu.Item>
                <Grid style={{ width: '100%' }}>
                  <Grid.Column width={4} verticalAlign='middle'>
                    <Menu.Item className='daily-header-sums'>
                      <Button className='daily-arrow-button' circular animated={'fade'} onClick={handleClickPrev}>
                        <Button.Content visible><Icon className='arrow left icon'/></Button.Content>
                        <Button.Content hidden>
                          Prev
                        </Button.Content>
                      </Button>
                        {`${monthString[currentMonthYr[0]]} ${currentMonthYr[1]}`}
                      <Button className='daily-arrow-button' circular animated={'fade'} onClick={handleClickNext}>
                        <Button.Content visible><Icon className='arrow right icon'/></Button.Content>
                        <Button.Content hidden>
                          Next
                        </Button.Content>
                      </Button>
                  </Menu.Item>
                  </Grid.Column>
                  <Grid.Column width={6} textAlign='center'><Menu.Item className='daily-header-sums'>Total Net GHG:</Menu.Item>
                    <Menu.Item className='daily-header-sums' style={monthlySumStyle}>
                      {abs(monthlySum).toFixed(2)} lbs {monthlySum === 0 ? '' : monthlySum > 0 ? 'Produced' : 'Reduced'}
                    </Menu.Item></Grid.Column>

                  <Grid.Column width={4}
                               textAlign='center'><Menu.Item className='daily-header-sums'></Menu.Item></Grid.Column>
                  <Grid.Column width={2}
                               verticalAlign='middle'><Menu.Item>
                    <Button className='daily-add-button'
                            href={'#/addTrip'}>Add</Button>
                  </Menu.Item></Grid.Column>
                </Grid>
              </Menu>
              <Table fixed
                     className='daily-table'>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell className='daily-table-header'>Date</Table.HeaderCell>
                    <Table.HeaderCell className='daily-table-header'>Mode of Transportation</Table.HeaderCell>
                    <Table.HeaderCell className='daily-table-header'>Distance</Table.HeaderCell>
                    <Table.HeaderCell className='daily-table-header'>mpg</Table.HeaderCell>
                    <Table.HeaderCell className='daily-table-header'>Net Gallons</Table.HeaderCell>
                    <Table.HeaderCell className='daily-table-header'>Net GHG</Table.HeaderCell>
                    <Table.HeaderCell className='daily-table-header'>Delete Trip</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {monthTrips.map((trip) => <TripItem key={trip._id} trip={trip}/>)}
                  <Table.Row>
                    <Table.Cell>{`${monthTrips.length > 0 ? monthTrips.length : 'No'} Trips listed`}</Table.Cell></Table.Row>
                </Table.Body>
              </Table>
              <Footer id={'daily-footer'}/>
            </div>
        );
  }

Daily.propTypes = {
  ready: PropTypes.bool.isRequired,
  trips: PropTypes.array.isRequired,
  username: PropTypes.string,
};

export default withTracker(() => {
  const username = Meteor.user()?.username;
  const ready = Meteor.subscribe(tripPublications.trip).ready() && username !== undefined;
  const trips = Trips.find({}).fetch();
  return {
    ready,
    trips,
    username,
  };
})(Daily);
