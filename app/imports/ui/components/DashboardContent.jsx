import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Grid, Card } from 'semantic-ui-react';
import SideBar from './SideBar';
import Chart from './Chart';
import DashboardMilesCard from './DashboardMilesCard';
import DashboardFuelCard from './DashboardFuelCard';
import DashboardGhgCard from './DashboardGhgCard';
import DashboardTreeCard from './DashboardTreeCard';
import { ghgPerGallonFuel, poundsOfGhgPerTree } from '../../api/trip/TripCollection';

// Contains the graphs that visualizes the user's data.
function DashboardContent(
    {
      vehicleMilesSaved,
      vehicleMilesAdded,
      milesSavedPerDay,
      milesAddedPerDay,
      modesOfTransport,
      milesPerMode,
      userProfile,
      userReady,
      ghgReducedPerDay,
      fuelSavedPerDay,
      milesSavedAvg,
      milesTraveledAvg,
      fuelSavedAvg,
      fuelSpentAvg,
      ghgReducedAvg,
      ghgProducedAvg,
      evGhgProducedAvg,
    },
) {

  const milesPerDayData = [
    {
      x: milesSavedPerDay.date,
      y: milesSavedPerDay.distance,
      type: 'bar',
      text: milesSavedPerDay.mode,
      name: 'Miles Saved',
      marker: {
        color: 'rgb(33, 186, 69)',
      },
    },
    {
      x: milesAddedPerDay.date,
      y: milesAddedPerDay.distance,
      type: 'bar',
      text: milesAddedPerDay.mode,
      name: 'Miles Traveled',
      marker: {
        color: 'rgb(219, 40, 40)',
      },
    },
  ];

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

  const ghgProducedTotal = (fuelCostTotal * ghgPerGallonFuel).toFixed(2);

  const ghgReducedTotal = (fuelSavedTotal * ghgPerGallonFuel).toFixed(2);

  const ghgReducedPerDayData = {
    x: ghgReducedPerDay.date,
    y: ghgReducedPerDay.ghg,
    name: 'GHG Reduced (pounds)',
    type: 'bar',
  };

  // 100,000 trees = 2,400 tons of CO2 or 4,800,000 pounds of CO2
  // 1 tree = 48 pounds of CO2
  const treesPerGhgProduced = (ghgProducedTotal / poundsOfGhgPerTree).toFixed(0);
  const treesPerGhgReduced = (ghgReducedTotal / poundsOfGhgPerTree).toFixed(0);

  const modesOfTransportData = [{
    values: modesOfTransport.value,
    labels: modesOfTransport.label,
    type: 'pie',
    hole: 0.4,
    hoverinfo: 'label+percent',
  }];

  /* Graph Layouts */
  let chartBgColor = '';
  let chartGridColor = '';
  let chartFontColor = '';
  const tMargin = '40';
  const bMargin = '10';

  if (userProfile.theme === 'dark') {
    chartBgColor = '#213c5c';
    chartGridColor = '#5c5c5c';
    chartFontColor = '#FFFFFF';
  } else {
    chartBgColor = '';
    chartGridColor = '';
    chartFontColor = '';
  }

  const milesPerDayLayout = {
    autosize: true,
    height: '350',
    margin: {
      t: tMargin,
      b: bMargin,
    },
    barmode: 'group',
    xaxis: {
      range: [milesSavedPerDay.date[0], milesSavedPerDay.date[10]],
      rangeslider: { range: [milesSavedPerDay.date[0], milesSavedPerDay.date[milesSavedPerDay.length - 1]] },
      type: 'date',
      gridcolor: chartGridColor,
    },
    yaxis: {
      title: 'Miles Saved (miles)',
      range: [Math.min(...milesAddedPerDay.distance), Math.max(...milesSavedPerDay.distance)],
      type: 'linear',
      gridcolor: chartGridColor,
    },
    paper_bgcolor: chartBgColor,
    plot_bgcolor: chartBgColor,
    font: {
      color: chartFontColor,
    },
  };

  const defaultLayout = {
    autosize: true,
    height: '350',
    margin: {
      t: tMargin,
      b: bMargin,
    },
    showlegend: true,
    paper_bgcolor: chartBgColor,
    font: {
      color: chartFontColor,
    },
  };

  const fuelAndDollarPerDayLayout = {
    autosize: true,
    height: '400',
    margin: {
      b: bMargin,
    },
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
      gridcolor: chartGridColor,
    },
    yaxis: {
      title: 'Fuel and Money saved',
      range: [0, Math.max(...fuelSavedPerDay.price)],
      type: 'linear',
      gridcolor: chartGridColor,
    },
    paper_bgcolor: chartBgColor,
    plot_bgcolor: chartBgColor,
    font: {
      color: chartFontColor,
    },
  };

  const ghgReducedPerDayLayout = {
    autosize: true,
    height: '400',
    margin: {
      t: tMargin,
      b: bMargin,
    },
    xaxis: {
      range: [ghgReducedPerDay.date[0], ghgReducedPerDay.date[10]],
      rangeslider: { range: [ghgReducedPerDay.date[0], ghgReducedPerDay.date[ghgReducedPerDay.length - 1]] },
      type: 'date',
      gridcolor: chartGridColor,
    },
    yaxis: {
      title: 'GHG Reduced (pounds)',
      range: [0, Math.max(...ghgReducedPerDay.ghg)],
      type: 'linear',
      gridcolor: chartGridColor,
    },
    paper_bgcolor: chartBgColor,
    plot_bgcolor: chartBgColor,
    font: {
      color: chartFontColor,
    },
  };

  useEffect(() => {
    const generalCard = document.getElementsByClassName('general-card');
    const generalCardHeader = document.getElementsByClassName('card-header');
    if (userProfile.theme === 'dark') {
      for (let i = 0; i < generalCard.length; i++) {
        generalCard[i].classList.add('dark-card');
      }
      for (let i = 0; i < generalCardHeader.length; i++) {
        generalCardHeader[i].classList.add('dark-card-header');
      }
    } else {
      for (let i = 0; i < generalCard.length; i++) {
        generalCard[i].classList.remove('dark-card');
      }
      for (let i = 0; i < generalCardHeader.length; i++) {
        generalCardHeader[i].classList.remove('dark-card-header');
      }
    }
  }, [userProfile]);

  return (
      <div id='dashboard-container'>
        <SideBar
            userReady={userReady}
            userProfile={userProfile}
            theme={userProfile.theme}
        />
        <Card.Group centered stackable itemsPerRow={4}>
          <DashboardMilesCard
              milesSaved={vehicleMilesSaved}
              milesAdded={vehicleMilesAdded}
              milesSavedAvgPerYear={milesSavedAvg.year}
              milesSavedAvgPerMonth={milesSavedAvg.month}
              milesSavedAvgPerDay={milesSavedAvg.day}
              milesTraveledAvgPerYear={milesTraveledAvg.year}
              milesTraveledAvgPerMonth={milesTraveledAvg.month}
              milesTraveledAvgPerDay={milesTraveledAvg.day}
              milesPerMode={milesPerMode}
              userProfile={userProfile}
          />
          <DashboardFuelCard
              fuelCostTotal={fuelCostTotal}
              fuelSavedTotal={fuelSavedTotal}
              fuelSavedAvgPerYear={fuelSavedAvg.year}
              fuelSavedAvgPerMonth={fuelSavedAvg.month}
              fuelSavedAvgPerDay={fuelSavedAvg.day}
              fuelSpentAvgPerYear={fuelSpentAvg.year}
              fuelSpentAvgPerMonth={fuelSpentAvg.month}
              fuelSpentAvgPerDay={fuelSpentAvg.day}
              userProfile={userProfile}
          />
          <DashboardGhgCard
              ghgProducedTotal={ghgProducedTotal}
              ghgReducedTotal={ghgReducedTotal}
              ghgProducedAvg={ghgProducedAvg}
              ghgReducedAvg={ghgReducedAvg}
              evGhgProducedAvg={evGhgProducedAvg}
              userProfile={userProfile}
          />
          <DashboardTreeCard
              treesPerGhgProduced={treesPerGhgProduced}
              treesPerGhgReduced={treesPerGhgReduced}
              userProfile={userProfile}
          />
        </Card.Group>
        <Grid style={{ marginTop: '10px' }} stackable>
          <Grid.Row>
            <Grid.Column width={9}>
              <Card className='general-card' fluid>
                <Card.Header className='card-header'>
                  Miles Saved Per Day
                </Card.Header>
                <Card.Content>
                  <Chart chartData={milesPerDayData} chartLayout={milesPerDayLayout}/>
                </Card.Content>
              </Card>
            </Grid.Column>
            <Grid.Column width={7}>
              <Card className='general-card' fluid>
                <Card.Header className='card-header'>
                  Modes of Transportation Used
                </Card.Header>
                <Card.Content>
                  <Chart chartData={modesOfTransportData} chartLayout={defaultLayout}/>
                </Card.Content>
              </Card>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Grid style={{ marginTop: '10px' }} stackable columns='equal'>
          <Grid.Column>
            <Card className='general-card' fluid>
              <Card.Header className='card-header'>
                Fuel Saved per Day
              </Card.Header>
              <Card.Content>
                <Chart chartData={[fuelSavedPerDayData, dollarSavedPerFuelData]}
                       chartLayout={fuelAndDollarPerDayLayout}/>
              </Card.Content>
            </Card>
          </Grid.Column>
          <Grid.Column>
            <Card className='general-card' fluid>
              <Card.Header className='card-header'>
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
  milesAddedPerDay: PropTypes.object,
  modesOfTransport: PropTypes.object,
  milesPerMode: PropTypes.array,
  userProfile: PropTypes.object,
  userReady: PropTypes.bool,
  ghgProducedTotal: PropTypes.string,
  ghgReducedPerDay: PropTypes.object,
  fuelSavedPerDay: PropTypes.object,
  milesSavedAvg: PropTypes.object,
  milesTraveledAvg: PropTypes.object,
  fuelSavedAvg: PropTypes.object,
  fuelSpentAvg: PropTypes.object,
  ghgReducedAvg: PropTypes.object,
  ghgProducedAvg: PropTypes.object,
  evGhgProducedAvg: PropTypes.object,
};

export default DashboardContent;
