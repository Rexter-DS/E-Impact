import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Card, Grid, Icon, Loader, Progress, Statistic } from 'semantic-ui-react';
import { _ } from 'lodash';
import moment from 'moment';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Trips } from '../../api/trip/TripCollection';
import Chart from './Chart';
import { Users } from '../../api/user/UserCollection';

class Honolulu extends React.Component {
  componentDidUpdate() {
    Users.communityStyling(this.props);
  }

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  renderPage() {
    const nonCarArr = Trips.find({ county: 'Honolulu', mode: { $not: 'Gas Car' } }).fetch().map(function (element) {
      element.fuelSaved = element.distance / element.mpg;
      element.ghgSaved = element.fuelSaved * 19.6;
      return element;
    });

    const nonCarData = nonCarArr.reduce(function (m, d) {
      if (!m[d.date]) {
        m[d.date] = { ...d, count: 1 };
        return m;
      }
      m[d.date].distance += d.distance;
      m[d.date].fuelSaved += d.fuelSaved;
      m[d.date].ghgSaved += d.ghgSaved;
      m[d.date].count += 1;
      return m;
    }, {});

    const nonCarByDay = Object.keys(nonCarData).map(function (k) {
      const item = nonCarData[k];
      return {
        date: item.date,
        distance: item.distance,
        fuelSaved: (item.fuelSaved).toFixed(2),
        ghgSaved: (item.ghgSaved).toFixed(2),
      };
    });

    const carArr = Trips.find({ county: 'Honolulu', mode: 'Gas Car' }).fetch().map(function (element) {
      element.fuelUsed = element.distance / element.mpg;
      element.ghgProduced = element.fuelUsed * 19.6;
      return element;
    });

    const carData = carArr.reduce(function (m, d) {
      if (!m[d.date]) {
        m[d.date] = { ...d, count: 1 };
        return m;
      }
      m[d.date].distance += d.distance;
      m[d.date].fuelUsed += d.fuelUsed;
      m[d.date].ghgProduced += d.ghgProduced;
      m[d.date].count += 1;
      return m;
    }, {});

    const carByDay = Object.keys(carData).map(function (k) {
      const item = carData[k];
      return {
        date: item.date,
        distance: item.distance,
        fuelUsed: (item.fuelUsed).toFixed(2),
        ghgProduced: (item.ghgProduced).toFixed(2),
      };
    });

    const dates = _.map(nonCarByDay, 'date');
    const formattedDates = dates.map((date) => moment(date).format('YYYY-MM-DD'));
    const dates2 = _.map(carByDay, 'date');
    const formattedDates2 = dates2.map((date) => moment(date).format('YYYY-MM-DD'));
    const milesReduced = _.map(nonCarByDay, 'distance');
    const milesProduced = _.map(carByDay, 'distance');
    const fuelSavedByDay = _.map(nonCarByDay, 'fuelSaved');
    const fuelUsedByDay = _.map(carByDay, 'fuelUsed');
    const ghgSavedByDay = _.map(nonCarByDay, 'ghgSaved');
    const ghgProducedByDay = _.map(carByDay, 'ghgProduced');
    const totalUsers = Meteor.users.find({ 'profile.county': 'Honolulu' }).count();

    const carDistances = _.map(Trips.find({ county: 'Honolulu', mode: 'Gas Car' }).fetch(), 'distance');
    const carMpgs = _.map(Trips.find({ county: 'Honolulu', mode: 'Gas Car' }).fetch(), 'mpg');
    const fuelUsed = _.zipWith(carDistances, carMpgs, (distance, mpg) => distance / mpg);
    const totalFuelUsed = _.sum(fuelUsed).toFixed(2);
    const totalGhgProduced = (totalFuelUsed * 19.6).toFixed(2);

    const otherDistances = _.map(Trips.find({ county: 'Honolulu', mode: { $not: 'Gas Car' } }).fetch(), 'distance');
    const totalMilesSaved = _.sum(otherDistances).toFixed(2);
    const otherMpgs = _.map(Trips.find({ county: 'Honolulu', mode: { $not: 'Gas Car' } }).fetch(), 'mpg');
    const fuelSaved = _.zipWith(otherDistances, otherMpgs, (distance, mpg) => distance / mpg);
    const totalFuelSaved = _.sum(fuelSaved).toFixed(2);
    const totalGhgReduced = (totalFuelSaved * 19.6).toFixed(2);

    const bikeCount = _.size(Trips.find({ county: 'Honolulu', mode: 'Bike' }).fetch());
    const carpoolCount = _.size(Trips.find({ county: 'Honolulu', mode: 'Carpool' }).fetch());
    const evCount = _.size(Trips.find({ county: 'Honolulu', mode: 'Electric Vehicle' }).fetch());
    const carCount = _.size(Trips.find({ county: 'Honolulu', mode: 'Gas Car' }).fetch());
    const ptCount = _.size(Trips.find({ county: 'Honolulu', mode: 'Public Transportation' }).fetch());
    const teleworkCount = _.size(Trips.find({ county: 'Honolulu', mode: 'Telework' }).fetch());
    const walkCount = _.size(Trips.find({ county: 'Honolulu', mode: 'Walk' }).fetch());

    const modeDistribution = [{
      type: 'pie',
      hole: 0.4,
      values: [bikeCount, carpoolCount, evCount, carCount, ptCount, teleworkCount, walkCount],
      labels: ['Bike', 'Carpool', 'Electric Vehicle', 'Gas Car', 'Public Transportation', 'Telework', 'Walk'],
      hoverinfo: 'label+percent',
      textposition: 'inside',
    }];

    const vmtReduced =
        { x: formattedDates,
          y: milesReduced,
          stackgroup: 'one',
          name: 'Reduced' };

    const vmtProduced =
        { x: formattedDates2,
          y: milesProduced,
          stackgroup: 'one',
          name: 'Produced' };

    const vmtData = [vmtReduced, vmtProduced];

    const fuelSavings =
        { x: formattedDates,
          y: fuelSavedByDay,
          stackgroup: 'one',
          name: 'Saved' };

    const fuelUsage =
        { x: formattedDates2,
          y: fuelUsedByDay,
          stackgroup: 'one',
          name: 'Used' };

    const fuelData = [fuelSavings, fuelUsage];

    const ghgSavings =
        { x: formattedDates,
          y: ghgSavedByDay,
          stackgroup: 'one',
          name: 'Saved' };

    const ghgProduction =
        { x: formattedDates2,
          y: ghgProducedByDay,
          stackgroup: 'one',
          name: 'Produced' };

    const ghgData = [ghgSavings, ghgProduction];

    /* Graph Layouts */
    const chartBgColor = '#213c5c';
    const chartGridColor = '#5c5c5c';
    let modeLayout = {};
    let vmtLayout = {};
    let fuelLayout = {};
    let ghgLayout = {};

    if (this.props.userProfile.theme === 'dark') {
      modeLayout = {
        autosize: true,
        showlegend: true,
        paper_bgcolor: chartBgColor,
        font: {
          color: '#FFFFFF',
        },
      };
      vmtLayout = {
        autosize: true,
        xaxis: {
          rangeslider: { range: ['2020-01-01', '2021-12-31'] },
          type: 'date',
          gridcolor: chartGridColor,
        },
        yaxis: {
          title: 'Vehicle miles traveled',
          type: 'linear',
          gridcolor: chartGridColor,
        },
        paper_bgcolor: chartBgColor,
        plot_bgcolor: chartBgColor,
        font: {
          color: '#FFFFFF',
        },
      };
      fuelLayout = {
        autosize: true,
        xaxis: {
          rangeslider: { range: ['2020-01-01', '2021-12-31'] },
          type: 'date',
          gridcolor: chartGridColor,
        },
        yaxis: {
          title: 'Gallons of Gas',
          type: 'linear',
          gridcolor: chartGridColor,
        },
        paper_bgcolor: chartBgColor,
        plot_bgcolor: chartBgColor,
        font: {
          color: '#FFFFFF',
        },
      };
      ghgLayout = {
        autosize: true,
        xaxis: {
          rangeslider: { range: ['2020-01-01', '2021-12-31'] },
          type: 'date',
          gridcolor: chartGridColor,
        },
        yaxis: {
          title: 'Pounds of CO2',
          type: 'linear',
          gridcolor: chartGridColor,
        },
        paper_bgcolor: chartBgColor,
        plot_bgcolor: chartBgColor,
        font: {
          color: '#FFFFFF',
        },
      };
    } else {
      modeLayout = {
        autosize: true,
        showlegend: true,
      };
      vmtLayout = {
        autosize: true,
        xaxis: {
          rangeslider: { range: ['2020-01-01', '2021-12-31'] },
          type: 'date',
        },
        yaxis: {
          title: 'Vehicle miles traveled',
          type: 'linear',
        },
      };
      fuelLayout = {
        autosize: true,
        xaxis: {
          rangeslider: { range: ['2020-01-01', '2021-12-31'] },
          type: 'date',
        },
        yaxis: {
          title: 'Gallons of Gas',
          type: 'linear',
        },
      };
      ghgLayout = {
        autosize: true,
        xaxis: {
          rangeslider: { range: ['2020-01-01', '2021-12-31'] },
          type: 'date',
        },
        yaxis: {
          title: 'Pounds of CO2',
          type: 'linear',
        },
      };
    }

    return (
        <Grid centered>
          <Grid.Row>
            <Grid.Column as="h2" textAlign='center'>Honolulu County</Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={3} textAlign='center'> <Statistic>
              <Statistic.Value className='community-statistic'>
                <Icon name='users'/>{totalUsers}
              </Statistic.Value>
              <Statistic.Label className='community-statistic'>users</Statistic.Label>
            </Statistic>
            </Grid.Column>
            <Grid.Column width={5} textAlign='center'> <Statistic>
              <Statistic.Value className='community-statistic'><Icon name='car'/>{totalMilesSaved}</Statistic.Value>
              <Statistic.Label className='community-statistic'>vehicle miles traveled (VMT) reduced</Statistic.Label>
            </Statistic>
            </Grid.Column>
            <Grid.Column width={5}><Progress value={totalMilesSaved} total='20000' progress='percent'
                                             label="2021 GOAL: 20,000 VMT REDUCED" color="blue"/></Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={3} textAlign='center'> <Statistic color="red">
              <Statistic.Value><Icon name='fire'/>{totalFuelUsed}</Statistic.Value>
              <Statistic.Label className='community-statistic'>gallons of gas used</Statistic.Label>
            </Statistic>
            </Grid.Column>
            <Grid.Column width={5} textAlign='center'> <Statistic>
              <Statistic.Value className='community-statistic'><Icon name='fire'/>{totalFuelSaved}</Statistic.Value>
              <Statistic.Label className='community-statistic'>gallons of gas saved</Statistic.Label>
            </Statistic>
            </Grid.Column>
            <Grid.Column width={5}>
              <Progress value={totalFuelSaved} total='1000' progress='percent'
                        label="2021 GOAL: 1,000 GALLONS OF GAS SAVED" color="blue"/></Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={3} textAlign='center'> <Statistic color="red">
              <Statistic.Value><Icon name='cloud'/>{totalGhgProduced}</Statistic.Value>
              <Statistic.Label className='community-statistic'>pounds of C02 produced</Statistic.Label>
            </Statistic>
            </Grid.Column>
            <Grid.Column width={5} textAlign='center'> <Statistic>
              <Statistic.Value className='community-statistic'><Icon name='cloud'/>{totalGhgReduced}</Statistic.Value>
              <Statistic.Label className='community-statistic'>pounds of CO2 reduced</Statistic.Label>
            </Statistic>
            </Grid.Column>
            <Grid.Column width={5}>
              <Progress value={totalGhgReduced} total='10000' progress='percent'
                        label="2021 GOAL: 10,000 POUNDS OF CO2 REDUCED" color="blue"/></Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={7}>
              <Card className='community-card' fluid>
                <Card.Header className='community-card-header'>
                  Modes of Transportation
                </Card.Header>
                <Card.Content>
                  <Chart chartData={modeDistribution} chartLayout={modeLayout} />
                </Card.Content>
              </Card>
            </Grid.Column>
            <Grid.Column width={7}>
              <Card className='community-card' fluid>
                <Card.Header className='community-card-header'>
                  VMT Data
                </Card.Header>
                <Card.Content>
                  <Chart chartData={vmtData} chartLayout={vmtLayout} />
                </Card.Content>
              </Card>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={7}>
              <Card className='community-card' fluid>
                <Card.Header className='community-card-header'>
                  Fuel Data
                </Card.Header>
                <Card.Content>
                  <Chart chartData={fuelData} chartLayout={fuelLayout} />
                </Card.Content>
              </Card>
            </Grid.Column>
            <Grid.Column width={7}>
              <Card className='community-card' fluid>
                <Card.Header className='community-card-header'>
                  GHG Data
                </Card.Header>
                <Card.Content>
                  <Chart chartData={ghgData} chartLayout={ghgLayout} />
                </Card.Content>
              </Card>
            </Grid.Column>
          </Grid.Row>
        </Grid>
    );
  }
}

/** Require an array of Trip documents in the props. */
Honolulu.propTypes = {
  trips: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
  userProfile: PropTypes.object,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Trip documents.
  const subscription = Trips.subscribeTripCommunity();
  const userProfile = Users.getUserProfile(Meteor.user()?.username);
  return {
    trips: Trips.find({}).fetch(),
    ready: subscription.ready(),
    userProfile,
  };
})(Honolulu);
