import React, { useState } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Menu, Button, Table, Grid, Loader, Icon, Statistic } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { _ } from 'meteor/underscore';
import { useParams } from 'react-router-dom';
import SideBar from '../components/SideBar';
import { Trips, tripPublications } from '../../api/trip/TripCollection';
import TripItemAdmin from '../components/TripItemAdmin';

const Daily = (props) => {
  const monthString = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const today = new Date();
  const [currentMonthYr, setCurrentMonthYr] = useState([today.getMonth(), today.getFullYear()]);
  const monthTrips = _.filter(props.trips, (trip) => trip.date.getMonth() === currentMonthYr[0] && trip.date.getFullYear() === currentMonthYr[1]).sort((a, b) => ((a.date < b.date) ? 1 : -1));
  let monthlySum = 0;
  for (let i = 0; i < monthTrips.length; i++) {
    const tripMpg = monthTrips[i].mpg > 0 ? monthTrips[i].mpg : 25;
    const add = (monthTrips[i].distance / tripMpg) * 19.6;
    if (!Number.isNaN(add) && Number.isFinite(add)) {
      if (monthTrips[i].mode === 'Gas Car' || monthTrips[i].mode === 'Carpool') {
        monthlySum += add;
      } else {
        monthlySum -= add;
      }
    }
  }
  const monthlySumStyle = monthlySum > 0 ? { color: 'red' } : { color: 'green' };
  const monthlySumColor = monthlySum > 0 ? 'red' : 'green';

  function handleClickNext() {
    const m = (currentMonthYr[0] + 1) % 12;
    let y = currentMonthYr[1];
    if (m === 0) {
      y = currentMonthYr[1] + 1;
    }
    setCurrentMonthYr([m, y]);
  }

  function handleClickPrev() {
    const m = (currentMonthYr[0] + 11) % 12;
    let y = currentMonthYr[1];
    if (m === 11) {
      y -= 1;
    }
    setCurrentMonthYr([m, y]);
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
                <Grid className={'middle aligned'} style={{ width: '100%', marginLeft: '25px' }}>
                  <Grid.Column width={1} verticalAlign='middle'>
                    <Button className='daily-arrow-button' circular animated={'fade'} onClick={handleClickPrev}>
                      <Button.Content visible><Icon size='large' className='angle left'/></Button.Content>
                      <Button.Content hidden>
                        Prev
                      </Button.Content>
                    </Button>
                  </Grid.Column>
                  <Grid.Column width={3} verticalAlign='middle'>
                    <Button size='massive' className={'daily-date-button'} animated={'fade'} onClick={handleClickToday} fluid>
                      <Button.Content visible style={{ fontSize: '30px' }}>{`${monthString[currentMonthYr[0]]} ${currentMonthYr[1]}`}</Button.Content>
                      <Button.Content hidden>
                        Go to current month
                      </Button.Content>
                    </Button>
                  </Grid.Column>
                  <Grid.Column width={1} verticalAlign='middle'>
                    <Button className='daily-arrow-button' circular animated={'fade'} onClick={handleClickNext}>
                      <Button.Content visible><Icon size='large' className='angle right'/></Button.Content>
                      <Button.Content hidden>
                        Next
                      </Button.Content>
                    </Button>
                  </Grid.Column>
                  <Grid.Column width={4} textAlign='center'>
                    <Statistic size='small' color={monthlySumColor}>
                      <Statistic.Value><Icon name='cloud'/>{abs(monthlySum).toFixed(2)}</Statistic.Value>
                      <Statistic.Label style={{ fontSize: '18px' }}>{monthlySum === 0 ? '' : monthlySum > 0 ? 'lbs ghg Produced' : 'lbs ghg Reduced'}</Statistic.Label>
                    </Statistic>
                  </Grid.Column>
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
                  {monthTrips.map((trip) => <TripItemAdmin key={trip._id} trip={trip}/>)}
                  <Table.Row>
                    <Table.Cell className='daily-table-data'>{`${monthTrips.length > 0 ? monthTrips.length : 'No'} Trips listed`}</Table.Cell></Table.Row>
                </Table.Body>
              </Table>
            </div>
        );
  };

Daily.propTypes = {
  ready: PropTypes.bool.isRequired,
  trips: PropTypes.array.isRequired,
};

export default withTracker(() => {
  const { owner } = useParams();
  const ready = Meteor.subscribe(tripPublications.tripCommunity).ready();
  const trips = Trips.find({ owner }).fetch();
  return {
    ready,
    trips,
  };
})(Daily);
