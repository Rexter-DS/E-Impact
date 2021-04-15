import React, { useEffect } from 'react';
import { Meteor } from 'meteor/meteor';
import { _ } from 'lodash';
import moment from 'moment';
import { Button, Card, Grid, Icon, Modal, Progress, Statistic } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Trips } from '../../api/trip/TripCollection';
import Chart from './Chart';
import { Users } from '../../api/user/UserCollection';
import { getStateData } from '../../api/utilities/Utilities';

function State(props) {
  const data = getStateData();
  const totalUsers = data.totalUsers;
  const totalMilesSaved = data.totalMilesSaved;
  const totalFuelUsed = data.totalFuelUsed;
  const totalFuelSaved = data.totalFuelSaved;
  const totalGhgProduced = data.totalGhgProduced;
  const totalGhgReduced = data.totalGhgReduced;
  const modeDistribution = data.modeDistribution;
  const vmtData = data.vmtData;
  const fuelData = data.fuelData;
  const ghgData = data.ghgData;
  const vmtReducedCounties = data.vmtReducedCounties;
  const vmtProducedCounties = data.vmtProducedCounties;
  const fuelSavedCounties = data.fuelSavedCounties;
  const fuelUsedCounties = data.fuelUsedCounties;
  const ghgSavedCounties = data.ghgSavedCounties;
  const ghgProducedCounties = data.ghgProducedCounties;

  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [open3, setOpen3] = React.useState(false);

 const endDate = moment().format('YYYY-MM-DD');
 const startDate = moment().subtract(14, 'd').format('YYYY-MM-DD');

  /* Graph Layouts */
  const chartBgColor = '#213c5c';
  const chartGridColor = '#5c5c5c';
  let layout = {};
  let modeLayout = {};
  let vmtLayout = {};
  let fuelLayout = {};
  let ghgLayout = {};

  if (props.userProfile.theme === 'dark') {
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
        range: [startDate, endDate],
        rangeslider: { range: ['2020-12-31', endDate] },
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
        range: [startDate, endDate],
        rangeslider: { range: ['2020-12-31', endDate] },
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
        range: [startDate, endDate],
        rangeslider: { range: ['2020-12-31', endDate] },
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
   layout = {
      autosize: true,
      showlegend: true,
      barmode: 'group',
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
        range: [startDate, endDate],
        rangeslider: { range: ['2020-12-31', endDate] },
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
        range: [startDate, endDate],
        rangeslider: { range: ['2020-12-31', endDate] },
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
        range: [startDate, endDate],
        rangeslider: { range: ['2020-12-31', endDate] },
        type: 'date',
      },
      yaxis: {
        title: 'Pounds of CO2',
        type: 'linear',
      },
    };
    layout = {
      autosize: true,
      showlegend: true,
      barmode: 'group',

    };
  }

  /* DOM Styling */
  useEffect(() => {
    const communityCard = document.getElementsByClassName('community-card');
    const communityCardHeader = document.getElementsByClassName('community-card-header');
    const communityModal = document.getElementsByClassName('community-modal');
    if (props.userProfile.theme === 'dark') {
      for (let i = 0; i < communityCard.length; i++) {
        communityCard[i].classList.add('dark-community-card');
      }
      for (let i = 0; i < communityCardHeader.length; i++) {
        communityCardHeader[i].classList.add('dark-community-card-header');
      }
      for (let i = 0; i < communityModal.length; i++) {
        communityModal[i].classList.add('dark-community-modal');
      }
    } else {
      for (let i = 0; i < communityCard.length; i++) {
        communityCard[i].classList.remove('dark-community-card');
      }
      for (let i = 0; i < communityCardHeader.length; i++) {
        communityCardHeader[i].classList.remove('dark-community-card-header');
      }
      for (let i = 0; i < communityModal.length; i++) {
        communityModal[i].classList.remove('dark-community-modal');
      }
    }
  }, [props]);

   const ed = moment();
 const sd = moment().subtract(30, 'd');
 const result = Trips.find({ mode: { $not: 'Gas Car' } }).fetch().filter(d => {
   const date = new Date(d.date);
 return (sd < date && date < ed);
   });
  const totalDays = ed.diff(sd, 'days') + 1;
  const resultDistances = _.map(result, 'distance');
 const resultMpgs = _.map(result, 'mpg');
  const resultFuelSaved = _.zipWith(resultDistances, resultMpgs, (distance, mpg) => distance / mpg);
 const resultGhgSaved = resultFuelSaved.map(i => i * 19.6);
  const avgMilesReduced = (_.sum(resultDistances) / totalDays / totalUsers).toFixed(2);
 const avgFuelSaved = (_.sum(resultFuelSaved) / totalDays / totalUsers).toFixed(2);
 const avgGhgSaved = (_.sum(resultGhgSaved) / totalDays / totalUsers).toFixed(2);

  const myNonCarTrips = Trips.find({ owner: Meteor.user()?.username, mode: { $not: 'Gas Car' } }).fetch().filter(d => {
    const date = new Date(d.date);
    return (sd < date && date < ed);
  });
  const myNonCarDistances = _.map(myNonCarTrips, 'distance');
  const myNonCarMpgs = _.map(myNonCarTrips, 'mpg');
  const myFuelSaved = _.zipWith(myNonCarDistances, myNonCarMpgs, (distance, mpg) => distance / mpg);
  const myGhgReduced = myFuelSaved.map(i => i * 19.6);
  const myAvgMilesReduced = (_.sum(myNonCarDistances) / totalDays).toFixed(2);
  const myAvgFuelSaved = (_.sum(myFuelSaved) / totalDays).toFixed(2);
  const myAvgGhgReduced = (_.sum(myGhgReduced) / totalDays).toFixed(2);

  const AvgSaved = {
    x: ['VMT Reduced', 'Fuel Saved', 'GHG Reduced'],
    y: [avgMilesReduced, avgFuelSaved, avgGhgSaved],
    name: 'Mean',
    type: 'bar',
  };

  const userAvgSaved = {
    x: ['VMT Reduced', 'Fuel Saved', 'GHG Reduced'],
    y: [myAvgMilesReduced, myAvgFuelSaved, myAvgGhgReduced],
    name: 'My Average',
    type: 'bar',
  };

  const dataReduced = [AvgSaved, userAvgSaved];

  const result2 = Trips.find({ mode: 'Gas Car' }).fetch().filter(d => {
    const date = new Date(d.date);
    return (sd < date && date < ed);
  });
  const resultDistances2 = _.map(result2, 'distance');
  const resultMpgs2 = _.map(result2, 'mpg');
  const resultFuelUsed = _.zipWith(resultDistances2, resultMpgs2, (distance, mpg) => distance / mpg);
  const resultGhgProduced = resultFuelUsed.map(i => i * 19.6);
  const avgMilesProduced = (_.sum(resultDistances2) / totalDays / totalUsers).toFixed(2);
  const avgFuelUsed = (_.sum(resultFuelUsed) / totalDays / totalUsers).toFixed(2);
  const avgGhgProduced = (_.sum(resultGhgProduced) / totalDays / totalUsers).toFixed(2);

  const myCarTrips = Trips.find({ owner: Meteor.user()?.username, mode: 'Gas Car' }).fetch().filter(d => {
    const date = new Date(d.date);
    return (sd < date && date < ed);
  });
  const myCarDistances = _.map(myCarTrips, 'distance');
  const myCarMpgs = _.map(myCarTrips, 'mpg');
  const myFuelUsed = _.zipWith(myCarDistances, myCarMpgs, (distance, mpg) => distance / mpg);
  const myGhgProduced = myFuelUsed.map(i => i * 19.6);
  const myAvgMilesProduced = (_.sum(myCarDistances) / totalDays).toFixed(2);
  const myAvgFuelUsed = (_.sum(myFuelUsed) / totalDays).toFixed(2);
  const myAvgGhgProduced = (_.sum(myGhgProduced) / totalDays).toFixed(2);

  const AvgProduced = {
    x: ['VMT Produced', 'Fuel Used', 'GHG Produced'],
    y: [avgMilesProduced, avgFuelUsed, avgGhgProduced],
    name: 'Mean',
    type: 'bar',
  };

  const userAvgProduced = {
    x: ['VMT Produced', 'Fuel Used', 'GHG Produced'],
    y: [myAvgMilesProduced, myAvgFuelUsed, myAvgGhgProduced],
    name: 'My Average',
    type: 'bar',
  };

  const dataProduced = [AvgProduced, userAvgProduced];

  return (
      <Grid centered>
        <Grid.Row>
          <Grid.Column as="h2" textAlign='center'>State Wide</Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={3} textAlign='center'>
            <Statistic>
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
          <Grid.Column width={5}>
            <Progress value={totalMilesSaved} total='1000000' progress='percent'
                      label="2021 GOAL: 1,000,000 VMT REDUCED" color="blue"/></Grid.Column>
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
            <Progress value={totalFuelSaved} total='43000' progress='percent'
                      label="2021 GOAL: 43,000 GALLONS OF GAS SAVED" color="blue"/></Grid.Column>
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
            <Progress value={totalGhgReduced} total='858000' progress='percent'
                      label="2021 GOAL: 858,000 POUNDS OF CO2 REDUCED" color="blue"/></Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={7}>
            <Card fluid className='community-card'>
              <Card.Header className='community-card-header'>
                Modes of Transportation
              </Card.Header>
              <Card.Content>
                <Chart chartData={modeDistribution} chartLayout={modeLayout}/>
                <br/>
                <br/>
              </Card.Content>
            </Card>
          </Grid.Column>
          <Grid.Column width={7}>
            <Card className='community-card' fluid>
              <Card.Header className='community-card-header' textAlign='left'>
                VMT Data
              </Card.Header>
              <Card.Content>
                <Chart chartData={vmtData} chartLayout={vmtLayout}/>
                <Modal
                    onClose={() => setOpen(false)}
                    onOpen={() => setOpen(true)}
                    open={open}
                    trigger={<Button className='community-button'>Show Breakdown By County</Button>}
                >
                  <Modal.Header className='community-modal'>VMT Data Breakdown</Modal.Header>
                  <Modal.Content className='community-modal'>
                    <Grid centered>
                      <Grid.Row>
                        <Grid.Column width={8}>
                          <Card fluid>
                            <Card.Header className='community-card-header'>
                              VMT Reduced By County
                            </Card.Header>
                            <Card.Content>
                              <Chart chartData={vmtReducedCounties} chartLayout={vmtLayout}/>
                            </Card.Content>
                          </Card>
                        </Grid.Column>
                        <Grid.Column width={8}>
                          <Card fluid>
                            <Card.Header className='community-card-header'>
                              VMT Produced By County
                            </Card.Header>
                            <Card.Content>
                              <Chart chartData={vmtProducedCounties} chartLayout={vmtLayout}/>
                            </Card.Content>
                          </Card>
                        </Grid.Column>
                      </Grid.Row>
                    </Grid>
                  </Modal.Content>
                </Modal>
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
                <Chart chartData={fuelData} chartLayout={fuelLayout}/>
                <Modal
                    onClose={() => setOpen2(false)}
                    onOpen={() => setOpen2(true)}
                    open={open2}
                    trigger={<Button className='community-button'>Show Breakdown By County</Button>}
                >
                  <Modal.Header>Fuel Data Breakdown</Modal.Header>
                  <Modal.Content>
                    <Grid centered>
                      <Grid.Row>
                        <Grid.Column width={8}>
                          <Card fluid>
                            <Card.Header className='community-card-header'>
                              Fuel Saved By County
                            </Card.Header>
                            <Card.Content>
                              <Chart chartData={fuelSavedCounties} chartLayout={fuelLayout}/>
                            </Card.Content>
                          </Card>
                        </Grid.Column>
                        <Grid.Column width={8}>
                          <Card fluid>
                            <Card.Header className='community-card-header'>
                              Fuel Used By County
                            </Card.Header>
                            <Card.Content>
                              <Chart chartData={fuelUsedCounties} chartLayout={fuelLayout}/>
                            </Card.Content>
                          </Card>
                        </Grid.Column>
                      </Grid.Row>
                    </Grid>
                  </Modal.Content>
                </Modal>
              </Card.Content>
            </Card>
          </Grid.Column>
          <Grid.Column width={7}>
            <Card className='community-card' fluid>
              <Card.Header className='community-card-header'>
                GHG Data
              </Card.Header>
              <Card.Content>
                <Chart chartData={ghgData} chartLayout={ghgLayout}/>
                <Modal
                    onClose={() => setOpen3(false)}
                    onOpen={() => setOpen3(true)}
                    open={open3}
                    trigger={<Button className='community-button'>Show Breakdown By County</Button>}
                >
                  <Modal.Header>GHG Data Breakdown</Modal.Header>
                  <Modal.Content>
                    <Grid centered>
                      <Grid.Row>
                        <Grid.Column width={8}>
                          <Card fluid>
                            <Card.Header className='community-card-header'>
                              GHG Reduced By County
                            </Card.Header>
                            <Card.Content>
                              <Chart chartData={ghgSavedCounties} chartLayout={ghgLayout}/>
                            </Card.Content>
                          </Card>
                        </Grid.Column>
                        <Grid.Column width={8}>
                          <Card fluid>
                            <Card.Header className='community-card-header'>
                              GHG Produced By County
                            </Card.Header>
                            <Card.Content>
                              <Chart chartData={ghgProducedCounties} chartLayout={ghgLayout}/>
                            </Card.Content>
                          </Card>
                        </Grid.Column>
                      </Grid.Row>
                    </Grid>
                  </Modal.Content>
                </Modal>
              </Card.Content>
            </Card>
          </Grid.Column>
        </Grid.Row>
     <Grid.Row>
          <Grid.Column width={7}>
            <Card fluid className='community-card'>
              <Card.Header className='community-card-header'>
                Average from the last 30 days
              </Card.Header>
              <Card.Content>
                <Chart chartData={dataReduced} chartLayout={layout}/>
                * Mean was calculated from all user averages
              </Card.Content>
            </Card>
          </Grid.Column>
          <Grid.Column width={7}>
            <Card fluid className='community-card'>
              <Card.Header className='community-card-header'>
                Average from the last 30 days
              </Card.Header>
              <Card.Content>
                <Chart chartData={dataProduced} chartLayout={layout}/>
                * Mean was calculated from all user averages
              </Card.Content>
            </Card>
          </Grid.Column>
        </Grid.Row>
      </Grid>

  );
}

/** Require an array of Trip documents in the props. */
State.propTypes = {
  groupsByDate: PropTypes.object,
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
})(State);

/*
 db.TripsCollection.find({"date":{ $gte:ISODate("2021-04-10"), $lt:ISODate("2021-04-15") } }).pretty();
{resultDistances2} <br/>
{count}<br/>
{resultMpgs2}<br/>
fuel: {avgFuelUsed}<br/>
miles: {avgMilesProduced}<br/>
ghg: {avgGhgProduced}
*/
