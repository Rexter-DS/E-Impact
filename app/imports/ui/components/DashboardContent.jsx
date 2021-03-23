import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Popup, Card, Statistic, Icon } from 'semantic-ui-react';
import SideBar from './SideBar';
import Chart from './Chart';

// Contains the graphs that visualizes the user's data.
function DashboardContent(
    {
      vehicleMilesSaved,
      vehicleMilesAdded,
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
    text: milesSavedPerDay.mode,
  }];

  const fuelSavedTotal = (vehicleMilesSaved / userProfile.autoMPG).toFixed(2);
  const fuelCostTotal = (vehicleMilesAdded / userProfile.autoMPG).toFixed(2);

  const fuelSavedPerDayData = {
    x: fuelSavedPerDay.date,
    y: fuelSavedPerDay.fuel,
    name: 'Fuel Saved (gallons)',
    type: 'scatter',
    mode: 'lines+markers',
  };

  const dollarSavedPerFuelData = {
    x: fuelSavedPerDay.date,
    y: fuelSavedPerDay.price,
    name: 'Money Saved per Fuel Saved (dollars)',
    type: 'scatter',
    mode: 'lines+markers',
  };

  const ghgProducedTotal = (fuelCostTotal * 19.6).toFixed(2);

  const ghgReducedTotal = (fuelSavedTotal * 19.6).toFixed(2);

  const ghgReducedPerDayData = {
    x: ghgReducedPerDay.date,
    y: ghgReducedPerDay.ghg,
    name: 'GHG Reduced (pounds)',
    type: 'bar',
  };

  // 100,000 trees = 2,400 tons of CO2 or 4,800,000 pounds of CO2
  // 1 tree = 48 pounds of CO2
  const treesPerGhgProduced = (ghgProducedTotal / 48).toFixed(0);
  const treesPerGhgReduced = (ghgReducedTotal / 48).toFixed(0);

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

  const milesSavedPerDayLayout = {
    autosize: true,
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

  const fuelAndDollarPerDayLayout = {
    autosize: true,
    showlegend: true,
    legend: {
      orientation: 'h',
      x: 0,
      y: 1.3,
    },
    xaxis: {
      range: [fuelSavedPerDay.date[0], fuelSavedPerDay.date[10]],
      rangeslider: { range: [fuelSavedPerDay.date[0], fuelSavedPerDay.date[fuelSavedPerDay.length - 1]] },
      type: 'date',
    },
    yaxis: {
      title: 'Fuel and Money saved',
      range: [0, Math.max(...fuelSavedPerDay.price)],
      type: 'linear',
    },
  };

  const ghgReducedPerDayLayout = {
    autosize: true,
    xaxis: {
      range: [ghgReducedPerDay.date[0], ghgReducedPerDay.date[10]],
      rangeslider: { range: [ghgReducedPerDay.date[0], ghgReducedPerDay.date[ghgReducedPerDay.length - 1]] },
      type: 'date',
    },
    yaxis: {
      title: 'GHG Reduced (pounds)',
      range: [0, Math.max(...ghgReducedPerDay.ghg)],
      type: 'linear',
    },
  };

  return (
      <div id='dashboard-container'>
        <SideBar/>
        <Card.Group centered stackable itemsPerRow={4}>
          <Popup
              trigger={
                <Card>
                  <Card.Header style={{ paddingLeft: '10px' }}>
                    Vehicle Miles Traveled (VMT)
                  </Card.Header>
                  <Card.Content textAlign='center'>
                    <Statistic>
                      <Statistic.Value>{vehicleMilesSaved}</Statistic.Value>
                      <Statistic.Label>miles saved</Statistic.Label>
                    </Statistic>
                  </Card.Content>
                  <Card.Content textAlign='center'>
                    <Statistic>
                      <Statistic.Value>{vehicleMilesAdded}</Statistic.Value>
                      <Statistic.Label>miles traveled</Statistic.Label>
                    </Statistic>
                  </Card.Content>
                </Card>
              }
          >
            <Popup.Content>
              The top number represents how many miles you traveled using environmentally conscious modes of transportation.<br/>
              The bottom number represents how many miles you traveled using a gas-powered car.
            </Popup.Content>
          </Popup>
          <Popup
              trigger={
                <Card>
                  <Card.Header style={{ paddingLeft: '10px' }}>
                    Gallons of Fuel
                  </Card.Header>
                  <Card.Content textAlign='center'>
                    <Statistic>
                      <Statistic.Value>{fuelSavedTotal}</Statistic.Value>
                      <Statistic.Label>gallons saved</Statistic.Label>
                    </Statistic>
                  </Card.Content>
                  <Card.Content textAlign='center'>
                    <Statistic>
                      <Statistic.Value>{fuelCostTotal}</Statistic.Value>
                      <Statistic.Label>gallons spent</Statistic.Label>
                    </Statistic>
                  </Card.Content>
                </Card>
              }
          >
            <Popup.Content>
              The top number represents how many gallons of fuel you saved by using other modes of transportation.<br/>
              The bottom number represents how many gallons of fuel you spent by traveling using a gas-powered car.
            </Popup.Content>
          </Popup>
          <Popup
              trigger={
                <Card>
                  <Card.Header style={{ paddingLeft: '10px' }}>
                    Green House Gas (GHG)
                  </Card.Header>
                  <Card.Content textAlign='center'>
                    <Statistic>
                      <Statistic.Value>{ghgReducedTotal}</Statistic.Value>
                      <Statistic.Label>pounds reduced</Statistic.Label>
                    </Statistic>
                  </Card.Content>
                  <Card.Content textAlign='center'>
                    <Statistic>
                      <Statistic.Value>{ghgProducedTotal}</Statistic.Value>
                      <Statistic.Label>pounds produced</Statistic.Label>
                    </Statistic>
                  </Card.Content>
                </Card>
              }
          >
            <Popup.Content>
              The top number represents how many pounds of GHG you reduced by using other modes of transportation.<br/>
              The bottom number represents how many pounds of GHG you produced by using a gas-powered car.
            </Popup.Content>
          </Popup>
          <Popup
              trigger={
                <Card>
                  <Card.Header style={{ paddingLeft: '10px' }}>
                    Trees per GHG
                  </Card.Header>
                  <Card.Content textAlign='center'>
                    <Grid>
                      <Grid.Column textAlign='right' width={6} style={{ paddingRight: '0px' }}>
                        <Icon
                            name='tree'
                            color='green'
                            size='huge'
                            style={{ paddingLeft: '10px', paddingTop: '10px' }}
                        />
                      </Grid.Column>
                      <Grid.Column width={10} style={{ paddingLeft: '0px' }}>
                        <Statistic>
                          <Statistic.Value>
                            {treesPerGhgReduced}
                          </Statistic.Value>
                          <Statistic.Label>trees per ghg reduced</Statistic.Label>
                        </Statistic>
                      </Grid.Column>
                    </Grid>
                  </Card.Content>
                  <Card.Content>
                    <Grid>
                      <Grid.Column textAlign='right' width={6} style={{ paddingRight: '0px' }}>
                        <Icon
                            name='tree'
                            color='red'
                            size='huge'
                            style={{ paddingLeft: '10px', paddingTop: '10px' }}
                        />
                      </Grid.Column>
                      <Grid.Column width={10} style={{ paddingLeft: '0px' }}>
                        <Statistic>
                          <Statistic.Value>
                            {treesPerGhgProduced}
                          </Statistic.Value>
                          <Statistic.Label>trees per ghg produced</Statistic.Label>
                        </Statistic>
                      </Grid.Column>
                    </Grid>
                  </Card.Content>
                </Card>
              }
          >
            <Popup.Content>
              One tree alone absorbs 48 pounds of CO<sub>2</sub> each year.<br/>
              Based on the amount of GHG you have reduced, you have made a contribution of reducing GHG equal to {treesPerGhgReduced} trees.<br/>
              Based on the amount of GHG you have produced, you would need to plant {treesPerGhgProduced} trees.
            </Popup.Content>
          </Popup>
        </Card.Group>
        <Grid stackable>
          <Grid.Row>
            <Grid.Column width={9}>
              <Card fluid>
                <Card.Header style={{ paddingLeft: '10px', color: '#4183C4' }}>
                  Miles Saved Per Day
                </Card.Header>
                <Card.Content>
                  <Chart chartData={milesSavedPerDayData} chartLayout={milesSavedPerDayLayout}/>
                </Card.Content>
              </Card>
            </Grid.Column>
            <Grid.Column width={7}>
              <Card fluid>
                <Card.Header style={{ paddingLeft: '10px', color: '#4183C4' }}>
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
              <Card.Header style={{ paddingLeft: '10px', color: '#4183C4' }}>
                Fuel Saved per Day
              </Card.Header>
              <Card.Content>
                <Chart chartData={[fuelSavedPerDayData, dollarSavedPerFuelData]} chartLayout={fuelAndDollarPerDayLayout}/>
              </Card.Content>
            </Card>
          </Grid.Column>
          <Grid.Column>
            <Card fluid>
              <Card.Header style={{ paddingLeft: '10px', color: '#4183C4' }}>
                GHG Reduced per Day
              </Card.Header>
              <Card.Content>
                <Chart chartData={[ghgReducedPerDayData]} chartLayout={ghgReducedPerDayLayout}/>
              </Card.Content>
            </Card>
          </Grid.Column>
        </Grid>
      </div>
  );
}

DashboardContent.propTypes = {
  vehicleMilesSaved: PropTypes.number,
  vehicleMilesAdded: PropTypes.number,
  milesTotal: PropTypes.number,
  milesSavedPerDay: PropTypes.object,
  modesOfTransport: PropTypes.object,
  userProfile: PropTypes.object,
  ghgProducedTotal: PropTypes.string,
  ghgReducedPerDay: PropTypes.object,
  fuelSavedPerDay: PropTypes.object,
};

export default DashboardContent;
