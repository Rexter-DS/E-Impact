import React, { useEffect } from 'react';
import { Meteor } from 'meteor/meteor';
import { Card, Grid, Icon, Progress, Statistic, Modal, Button } from 'semantic-ui-react';
import moment from 'moment';
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
  const dataReduced = data.dataReduced;
  const dataProduced = data.dataProduced;

  const endDate = moment().format('YYYY-MM-DD');
  const startDate = moment().subtract(14, 'd').format('YYYY-MM-DD');

  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [open3, setOpen3] = React.useState(false);

  /* Graph Layouts */
  let chartBgColor = '';
  let chartGridColor = '';
  let chartFontColor = '';
  const tMargin = '40';
  const bMargin = '40';

  if (props.userProfile.theme === 'dark') {
    chartBgColor = '#213c5c';
    chartGridColor = '#5c5c5c';
    chartFontColor = '#FFFFFF';
  } else {
    chartBgColor = '';
    chartGridColor = '';
    chartFontColor = '';
  }

  const modeLayout = {
    autosize: true,
    showlegend: true,
    paper_bgcolor: chartBgColor,
    font: {
      color: chartFontColor,
    },
  };
  const vmtLayout = {
    autosize: true,
    margin: {
      t: tMargin,
      b: bMargin,
    },
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
      color: chartFontColor,
    },
  };
  const fuelLayout = {
    autosize: true,
    margin: {
      t: tMargin,
      b: bMargin,
    },
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
      color: chartFontColor,
    },
  };
  const ghgLayout = {
    autosize: true,
    margin: {
      t: tMargin,
      b: bMargin,
    },
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
      color: chartFontColor,
    },
  };
  const avgLayout = {
    autosize: true,
    margin: {
      t: tMargin,
      b: bMargin,
    },
    showlegend: true,
    barmode: 'group',
    paper_bgcolor: chartBgColor,
    plot_bgcolor: chartBgColor,
    font: {
      color: chartFontColor,
    },
  };

  const vmtModal =
      <Modal
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
          open={open}
          trigger={<Button className='community-button'>Show Breakdown By County</Button>}
      >
        <Modal.Header className='card-modal'>VMT Data Breakdown</Modal.Header>
        <Modal.Content className='card-modal'>
          <Grid centered>
            <Grid.Row>
              <Grid.Column width={8}>
                <Card className='card-modal' fluid>
                  <Card.Header>
                    VMT Reduced By County
                  </Card.Header>
                  <Card.Content>
                    <Chart chartData={vmtReducedCounties} chartLayout={vmtLayout}/>
                  </Card.Content>
                </Card>
              </Grid.Column>
              <Grid.Column width={8}>
                <Card className='card-modal' fluid>
                  <Card.Header>
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
      </Modal>;

  const fuelModal =
      <Modal
          onClose={() => setOpen2(false)}
          onOpen={() => setOpen2(true)}
          open={open2}
          trigger={<Button className='community-button'>Show Breakdown By County</Button>}
      >
        <Modal.Header className='card-modal'>Fuel Data Breakdown</Modal.Header>
        <Modal.Content className='card-modal'>
          <Grid centered>
            <Grid.Row>
              <Grid.Column width={8}>
                <Card className='card-modal' fluid>
                  <Card.Header className='card-header'>
                    Fuel Saved By County
                  </Card.Header>
                  <Card.Content>
                    <Chart chartData={fuelSavedCounties} chartLayout={fuelLayout}/>
                  </Card.Content>
                </Card>
              </Grid.Column>
              <Grid.Column width={8}>
                <Card className='card-modal' fluid>
                  <Card.Header className='card-header'>
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
      </Modal>;

  const ghgModal =
      <Modal
          onClose={() => setOpen3(false)}
          onOpen={() => setOpen3(true)}
          open={open3}
          trigger={<Button className='community-button'>Show Breakdown By County</Button>}
      >
        <Modal.Header className='card-modal'>GHG Data Breakdown</Modal.Header>
        <Modal.Content className='card-modal'>
          <Grid centered>
            <Grid.Row>
              <Grid.Column width={8}>
                <Card className='card-modal' fluid>
                  <Card.Header className='card-header'>
                    GHG Reduced By County
                  </Card.Header>
                  <Card.Content>
                    <Chart chartData={ghgSavedCounties} chartLayout={ghgLayout}/>
                  </Card.Content>
                </Card>
              </Grid.Column>
              <Grid.Column width={8}>
                <Card className='card-modal' fluid>
                  <Card.Header className='card-header'>
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
      </Modal>;

  /* DOM Styling */
  useEffect(() => {
    const communityCard = document.getElementsByClassName('community-card');
    const cardHeader = document.getElementsByClassName('card-header');
    const communityModal = document.getElementsByClassName('card-modal');
    if (props.userProfile.theme === 'dark') {
      for (let i = 0; i < communityCard.length; i++) {
        communityCard[i].classList.add('dark-community-card');
      }
      for (let i = 0; i < cardHeader.length; i++) {
        cardHeader[i].classList.add('dark-card-header');
      }
      for (let i = 0; i < communityModal.length; i++) {
        communityModal[i].classList.add('dark-card');
      }
    } else {
      for (let i = 0; i < communityCard.length; i++) {
        communityCard[i].classList.remove('dark-community-card');
      }
      for (let i = 0; i < cardHeader.length; i++) {
        cardHeader[i].classList.remove('dark-card-header');
      }
      for (let i = 0; i < communityModal.length; i++) {
        communityModal[i].classList.remove('dark-card');
      }
    }
  }, [props, vmtModal, fuelModal, ghgModal]);

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
            <Progress value={totalMilesSaved} total='1000000'
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
            <Progress value={totalFuelSaved} total='43000'
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
            <Progress value={totalGhgReduced} total='858000'
                      label="2021 GOAL: 858,000 POUNDS OF CO2 REDUCED" color="blue"/></Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={7}>
            <Card fluid className='community-card'>
              <Card.Header className='card-header'>
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
              <Card.Header className='card-header' textAlign='left'>
                VMT Data
              </Card.Header>
              <Card.Content>
                <Chart chartData={vmtData} chartLayout={vmtLayout}/>
                {vmtModal}
              </Card.Content>
            </Card>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={7}>
            <Card className='community-card' fluid>
              <Card.Header className='card-header'>
                Fuel Data
              </Card.Header>
              <Card.Content>
                <Chart chartData={fuelData} chartLayout={fuelLayout}/>
                {fuelModal}
              </Card.Content>
            </Card>
          </Grid.Column>
          <Grid.Column width={7}>
            <Card className='community-card' fluid>
              <Card.Header className='card-header'>
                GHG Data
              </Card.Header>
              <Card.Content>
                <Chart chartData={ghgData} chartLayout={ghgLayout}/>
                {ghgModal}
              </Card.Content>
            </Card>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={7}>
            <Card fluid className='community-card'>
              <Card.Header className='card-header'>
                Average from the last 30 days
              </Card.Header>
              <Card.Content>
                <Chart chartData={dataReduced} chartLayout={avgLayout}/>
                * Mean calculated from all user averages
              </Card.Content>
            </Card>
          </Grid.Column>
          <Grid.Column width={7}>
            <Card fluid className='community-card'>
              <Card.Header className='card-header'>
                Average from the last 30 days
              </Card.Header>
              <Card.Content>
                <Chart chartData={dataProduced} chartLayout={avgLayout}/>
                * Mean calculated from all user averages
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
