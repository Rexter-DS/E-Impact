import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Card, Statistic } from 'semantic-ui-react';
import SideBar from './SideBar';
import Chart from './Chart';

// Contains the graphs that visualizes the user's data.
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

  const milesSavedPerDayData = [{
    x: milesSavedPerDay.date,
    y: milesSavedPerDay.distance,
    type: 'bar',
    name: 'Miles saved',
    text: milesSavedPerDay.mode,
  }];

  console.log(milesSavedPerDay.date);
  console.log(milesSavedPerDay.date[0]);
  console.log(milesSavedPerDay.date[7]);
  console.log(Math.max(...milesSavedPerDay.distance));
  const milesSavedPerDayLayout = {
    xaxis: {
      //range: [milesSavedPerDay.date[0], milesSavedPerDay[7]],
      rangeslider: { range: [milesSavedPerDay[0], milesSavedPerDay[milesSavedPerDay.length - 1]] },
      type: 'date',
    },
    yaxis: {
      autorange: true,
      range: [0, Math.max(...milesSavedPerDay.distance)],
      type: 'linear',
    },
  };

  const fuelSavedTotal = (milesSavedTotal / userProfile.autoMPG).toFixed(2);

  const fuelSavedPerDayData = [{
    x: fuelSavedPerDay.date,
    y: fuelSavedPerDay.fuel,
    name: 'Fuel Saved',
    type: 'bar',
  }];

  const ghgReducedTotal = (fuelSavedTotal * 19.6).toFixed(2);

  const ghgReducedPerDayData = [{
    x: ghgReducedPerDay.date,
    y: ghgReducedPerDay.ghg,
    name: 'GHG Reduced',
    type: 'bar',
  }];

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

  return (
      <div id='dashboard-container'>
        <SideBar/>
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
                  <Chart chartData={milesSavedPerDayData} chartLayout={milesSavedPerDayLayout}/>
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
        <Grid stackable columns='equal'>
          <Grid.Column>
            <Card fluid>
              <Card.Header style={{ paddingLeft: '10px' }}>
                Fuel Saved per Day
              </Card.Header>
              <Card.Content>
                <Chart chartData={fuelSavedPerDayData} chartLayout={defaultLayout}/>
              </Card.Content>
            </Card>
          </Grid.Column>
          <Grid.Column>
            <Card fluid>
              <Card.Header style={{ paddingLeft: '10px' }}>
                GHG Reduced per Day
              </Card.Header>
              <Card.Content>
                <Chart chartData={ghgReducedPerDayData} chartLayout={defaultLayout}/>
              </Card.Content>
            </Card>
          </Grid.Column>
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
