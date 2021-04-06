import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Card, Statistic } from 'semantic-ui-react';
import SideBar from './SideBar';
import Chart from './Chart';

// Contains the graphs that visualizes the user's data.
function WhatIfContent(
    {
      milesSavedTotal,
      milesSavedPerDay,
      modesOfTransport,
      userProfile,
      ghgProducedTotal,
      ghgReducedPerDay,
      fuelSavedPerDay,
      // milesSavedTotalWI,
      milesSavedPerDayWI,
      modesOfTransportWI,
      // ghgProducedTotalWI,
      ghgReducedPerDayWI,
      fuelSavedPerDayWI,
    },
) {

  const milesSavedPerDayData = [{
    x: milesSavedPerDay.date,
    y: milesSavedPerDay.distance,
    type: 'bar',
    text: milesSavedPerDay.mode,
    name: 'Original',
  },
    {
      x: milesSavedPerDayWI.date,
      y: milesSavedPerDayWI.distance,
      type: 'bar',
      text: milesSavedPerDayWI.mode,
      name: 'What If',
      marker: { color: 'rgb(173,216,230)' },
    }];

  const milesSavedPerDayLayout = {
    autosize: true,
    barmode: 'group',
    xaxis: {
      range: [milesSavedPerDay.date[0], milesSavedPerDay.date[10]],
      rangeslider: { range: [milesSavedPerDay.date[0], milesSavedPerDay.date[milesSavedPerDay.length - 1]] },
      type: 'date',
    },
    yaxis: {
      title: 'Miles Saved (miles)',
      range: [0, Math.max(...milesSavedPerDay.distance)],
      type: 'linear',
    },
  };

  const fuelSavedTotal = (milesSavedTotal / userProfile.autoMPG).toFixed(2);

  const fuelSavedPerDayData = {
    x: fuelSavedPerDay.date,
    y: fuelSavedPerDay.fuel,
    name: 'Original Fuel Saved (gallons)',
    type: 'scatter',
    mode: 'lines+markers',
    line: {
      width: 7 },
  };
  const fuelSavedPerDayDataWI = {
    x: fuelSavedPerDayWI.date,
    y: fuelSavedPerDayWI.fuel,
    name: 'What If Fuel Saved (gallons)',
    type: 'scatter',
    mode: 'lines+markers',
    line: {
      color: 'rgb(176,216,230)',
      width: 1 },
  };

  const ghgReducedTotal = (fuelSavedTotal * 19.6).toFixed(2);

  const ghgReducedPerDayData = {
    x: ghgReducedPerDay.date,
    y: ghgReducedPerDay.ghg,
    name: 'Original GHG Reduced (pounds)',
    type: 'scatter',
    mode: 'lines+markers',
    line: {
      color: 'rgb(44,160,44)',
      width: 7 },
  };
  const ghgReducedPerDayDataWI = {
    x: ghgReducedPerDayWI.date,
    y: ghgReducedPerDayWI.ghg,
    name: 'What If GHG Reduced (pounds)',
    type: 'scatter',
    mode: 'lines+markers',
    line: {
      color: 'rgb(0,229,0)',
      width: 2 },
  };
  const fuelAndGhgPerDayLayout = {
    autosize: true,
    showlegend: true,
    xaxis: {
      range: [fuelSavedPerDay.date[0], fuelSavedPerDay.date[10]],
      rangeslider: { range: [fuelSavedPerDay.date[0], fuelSavedPerDay.date[fuelSavedPerDay.length - 1]] },
      type: 'date',
    },
    yaxis: {
      title: 'Fuel and GHG saved',
      range: [0, Math.max(...ghgReducedPerDay.ghg)],
      type: 'linear',
    },
  };

  const modesOfTransportData = [{
    values: modesOfTransport.value,
    labels: modesOfTransport.label,
    type: 'pie',
    hole: 0.4,
    hoverinfo: 'label+percent',
    domain: { column: 0 },
  },
    {
      values: modesOfTransportWI.value,
      labels: modesOfTransportWI.label,
      type: 'pie',
      hole: 0.4,
      hoverinfo: 'label+percent',
      domain: { column: 1 },
    }];

  const defaultLayout = {
    autosize: true,
    showlegend: true,
    annotations: [
        {
          font: { size: 15 },
          showarrow: false,
          text: 'Old',
          x: 0.17,
          y: 0.5,
        },
      {
        font: { size: 15 },
        showarrow: false,
        text: 'New',
        x: 0.82,
        y: 0.5,
      }],
    grid: { rows: 1, columns: 2 },
  };

  return (
      <div id='dashboard-container'>
        <SideBar/>
        <Card.Group centered stackable itemsPerRow={4}>
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
              Green House Gas (GHG) Produced
            </Card.Header>
            <Card.Content textAlign='center'>
              <Statistic>
                <Statistic.Value>{ghgProducedTotal}</Statistic.Value>
                <Statistic.Label>pounds</Statistic.Label>
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
                Fuel Saved and GHG Reduced per Day
              </Card.Header>
              <Card.Content>
                <Chart chartData={[fuelSavedPerDayData, ghgReducedPerDayData, fuelSavedPerDayDataWI, ghgReducedPerDayDataWI]} chartLayout={fuelAndGhgPerDayLayout}/>
              </Card.Content>
            </Card>
          </Grid.Column>
        </Grid>
      </div>
  );
}

WhatIfContent.propTypes = {
  milesSavedTotal: PropTypes.number,
  milesSavedPerDay: PropTypes.object,
  modesOfTransport: PropTypes.object,
  userProfile: PropTypes.object,
  ghgProducedTotal: PropTypes.string,
  ghgReducedPerDay: PropTypes.object,
  fuelSavedPerDay: PropTypes.object,
  // milesSavedTotalWI: PropTypes.number,
  milesSavedPerDayWI: PropTypes.object,
  modesOfTransportWI: PropTypes.object,
  // ghgProducedTotalWI: PropTypes.string,
  ghgReducedPerDayWI: PropTypes.object,
  fuelSavedPerDayWI: PropTypes.object,
};

export default WhatIfContent;
