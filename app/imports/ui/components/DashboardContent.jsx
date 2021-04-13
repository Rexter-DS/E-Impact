import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Grid, Card } from 'semantic-ui-react';
import SideBar from './SideBar';
import Chart from './Chart';
import DashboardMilesCard from './DashboardMilesCard';
import DashboardFuelCard from './DashboardFuelCard';
import DashboardGhgCard from './DashboardGhgCard';
import DashboardTreeCard from './DashboardTreeCard';

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

  /* Graph Layouts */
  const chartBgColor = '#213c5c';
  const chartGridColor = '#5c5c5c';
  const chartFontColor = '#FFFFFF';
  let milesSavedPerDayLayout = {};
  let defaultLayout = {};
  let fuelAndDollarPerDayLayout = {};
  let ghgReducedPerDayLayout = {};

  if (userProfile.theme === 'dark') {
    milesSavedPerDayLayout = {
      autosize: true,
      xaxis: {
        range: [milesSavedPerDay.date[0], milesSavedPerDay.date[10]],
        rangeslider: { range: [milesSavedPerDay.date[0], milesSavedPerDay.date[milesSavedPerDay.length - 1]] },
        type: 'date',
        gridcolor: chartGridColor,
      },
      yaxis: {
        title: 'Miles Saved (miles)',
        range: [0, Math.max(...milesSavedPerDay.distance)],
        type: 'linear',
        gridcolor: chartGridColor,
      },
      paper_bgcolor: chartBgColor,
      plot_bgcolor: chartBgColor,
      font: {
        color: chartFontColor,
      },
    };
    defaultLayout = {
      autosize: true,
      showlegend: true,
      paper_bgcolor: chartBgColor,
      font: {
        color: chartFontColor,
      },
    };
    fuelAndDollarPerDayLayout = {
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
    ghgReducedPerDayLayout = {
      autosize: true,
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
  } else {
    milesSavedPerDayLayout = {
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
    defaultLayout = {
      autosize: true,
      showlegend: true,
    };
    fuelAndDollarPerDayLayout = {
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
    ghgReducedPerDayLayout = {
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
  }

  useEffect(() => {
    const generalCard = document.getElementsByClassName('general-card');
    const generalCardHeader = document.getElementsByClassName('general-card-header');
    if (userProfile.theme === 'dark') {
      for (let i = 0; i < generalCard.length; i++) {
        generalCard[i].classList.add('dark-general-card');
      }
      for (let i = 0; i < generalCardHeader.length; i++) {
        generalCardHeader[i].classList.add('dark-general-card-header');
      }
    } else {
      for (let i = 0; i < generalCard.length; i++) {
        generalCard[i].classList.remove('dark-general-card');
      }
      for (let i = 0; i < generalCardHeader.length; i++) {
        generalCardHeader[i].classList.add('dark-general-card-header');
      }
    }
  }, []);

  return (
      <div id='dashboard-container'>
        <SideBar theme={userProfile.theme}/>
        <Card.Group centered stackable itemsPerRow={4}>
          <DashboardMilesCard
              milesSaved={vehicleMilesSaved}
              milesAdded={vehicleMilesAdded}
              userProfile={userProfile}
          />
          <DashboardFuelCard
              fuelCostTotal={fuelCostTotal}
              fuelSavedTotal={fuelSavedTotal}
              userProfile={userProfile}
          />
          <DashboardGhgCard
              ghgProducedTotal={ghgProducedTotal}
              ghgReducedTotal={ghgReducedTotal}
              userProfile={userProfile}
          />
          <DashboardTreeCard
              treesPerGhgProduced={treesPerGhgProduced}
              treesPerGhgReduced={treesPerGhgReduced}
              userProfile={userProfile}
          />
        </Card.Group>
        <Grid stackable>
          <Grid.Row>
            <Grid.Column width={9}>
              <Card className='general-card' fluid>
                <Card.Header className='general-card-header'>
                  Miles Saved Per Day
                </Card.Header>
                <Card.Content>
                  <Chart chartData={milesSavedPerDayData} chartLayout={milesSavedPerDayLayout}/>
                </Card.Content>
              </Card>
            </Grid.Column>
            <Grid.Column width={7}>
              <Card className='general-card' fluid>
                <Card.Header className='general-card-header'>
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
            <Card className='general-card' fluid>
              <Card.Header className='general-card-header'>
                Fuel Saved per Day
              </Card.Header>
              <Card.Content>
                <Chart chartData={[fuelSavedPerDayData, dollarSavedPerFuelData]} chartLayout={fuelAndDollarPerDayLayout}/>
              </Card.Content>
            </Card>
          </Grid.Column>
          <Grid.Column>
            <Card className='general-card' fluid>
              <Card.Header className='general-card-header'>
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
