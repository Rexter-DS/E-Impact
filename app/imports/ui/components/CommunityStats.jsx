import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Card, Grid, Icon, Loader, Progress, Statistic } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Trips } from '../../api/trip/TripCollection';
import { getCountyData } from '../../api/utilities/Utilities.js';
import Chart from './Chart';
import { Users } from '../../api/user/UserCollection';

class CommunityStats extends React.Component {
  componentDidUpdate() {
    Users.communityStyling(this.props);
  }

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  renderPage() {
    const county = this.props.county;
    const hawaiiData = getCountyData(county);
    const totalUsers = hawaiiData.totalUsers;
    const totalMilesSaved = hawaiiData.totalMilesSaved;
    const totalFuelUsed = hawaiiData.totalFuelUsed;
    const totalFuelSaved = hawaiiData.totalFuelSaved;
    const totalGhgProduced = hawaiiData.totalGhgProduced;
    const totalGhgReduced = hawaiiData.totalGhgReduced;
    const modeDistribution = hawaiiData.modeDistribution;
    const vmtData = hawaiiData.vmtData;
    const fuelData = hawaiiData.fuelData;
    const ghgData = hawaiiData.ghgData;

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
            <Grid.Column as="h2" textAlign='center'>Hawaii County</Grid.Column>
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
CommunityStats.propTypes = {
  trips: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
  userProfile: PropTypes.object,
  county: PropTypes.string.isRequired,
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
})(CommunityStats);
