import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Card, Statistic } from 'semantic-ui-react';
import SidebarVisible from './SideBar';
import Chart from './Chart';

function DashboardContent(
    {
      milesSavedTotal,
      milesSavedPerDay,
      modesOfTransport,
      userProfile,
      ghgReducedPerDay,
      fuelSavedPerDay,
    },
) {

  const milesSavedTotalData = [{
    value: milesSavedTotal,
    type: 'indicator',
    mode: 'number',
    number: { suffix: ' miles' },
    title: 'VMT Reduced',
  }];

  const milesSavedPerDayData = [{
    x: milesSavedPerDay.date,
    y: milesSavedPerDay.distance,
    type: 'scatter',
    mode: 'markers',
    name: 'Miles saved',
    text: milesSavedPerDay.mode,
  }];

  const fuelSavedTotal = (milesSavedTotal / userProfile.autoMPG).toFixed(2);
/*
  const fuelSavedTotalData = [{
    value: fuelSavedTotal,
    type: 'indicator',
    mode: 'number',
    number: { suffix: ' gallons' },
    title: 'Gallons of Gas Saved',
  }];
*/
  const ghgReducedTotal = (fuelSavedTotal * 19.6).toFixed(2);

  /*
  const ghgReducedTotalData = [{
    value: ghgReducedTotal,
    type: 'indicator',
    mode: 'number',
    number: { suffix: ' pounds' },
    title: 'Pounds of GHG Reduced',
  }];
*/
  const modesOfTransportData = [{
    values: modesOfTransport.value,
    labels: modesOfTransport.label,
    type: 'pie',
    hole: 0.4,
    hoverinfo: 'label+percent',
  }];


  const defaultLayout = {
    autosize: true,
    showlegend: true,
  };

  const totalDataLayout = {
    height: '250px',
    width: '100%',
  };

  return (
      <div id='dashboard-container'>
        <SidebarVisible/>
        <Card.Group centered stackable>
          <Card>
            <Card.Header style={{ paddingLeft: '10px' }}>
              Vehicle Miles Traveled (VMT) Reduced
            </Card.Header>
            <Card.Content textAlign='center'>
              <Statistic>
                <Statistic.Value>{milesSavedTotal}</Statistic.Value>
                <Statistic.Label>miles</Statistic.Label>
              </Statistic>
            </Card.Content>
          </Card>
          <Card>
            <Card.Header style={{ paddingLeft: '10px' }}>
              Gallons of Fuel Saved
            </Card.Header>
            <Card.Content textAlign='center'>
              <Statistic>
                <Statistic.Value>{fuelSavedTotal}</Statistic.Value>
                <Statistic.Label>gallons</Statistic.Label>
              </Statistic>
            </Card.Content>
          </Card>
          <Card>
            <Card.Header style={{ paddingLeft: '10px' }}>
              Green House Gas (GHG) Reduced
            </Card.Header>
            <Card.Content textAlign='center'>
              <Statistic>
                <Statistic.Value>{ghgReducedTotal}</Statistic.Value>
                <Statistic.Label>pounds</Statistic.Label>
              </Statistic>
            </Card.Content>
          </Card>
        </Card.Group>
        <Grid stackable>
          <Grid.Row>
            <Grid.Column width={9}>
              <Card fluid>
                <Card.Header style={{ paddingLeft: '10px' }}>
                  Miles Saved Per Day
                </Card.Header>
                <Card.Content>
                  <Chart chartData={milesSavedPerDayData} chartLayout={defaultLayout}/>
                </Card.Content>
              </Card>
            </Grid.Column>
            <Grid.Column width={7}>
              <Card fluid>
                <Card.Header style={{ paddingLeft: '10px' }}>
                  Modes of Transportation Used
                </Card.Header>
                <Card.Content>
                  <Chart chartData={modesOfTransportData} chartLayout={defaultLayout}/>
                </Card.Content>
              </Card>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Grid>

        </Grid>
      </div>
  );
}

DashboardContent.propTypes = {
  milesSavedTotal: PropTypes.number,
  milesSavedPerDay: PropTypes.object,
  modesOfTransport: PropTypes.object,
  userProfile: PropTypes.object,
  ghgReducedPerDay: PropTypes.object,
  fuelSavedPerDay: PropTypes.object,
};

export default DashboardContent;
