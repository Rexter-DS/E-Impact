import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'semantic-ui-react';
import SidebarVisible from './SideBar';
import Chart from './Chart';

function DashboardContent({ milesSavedTotal, milesSavedPerDay, modesOfTransport, userProfile }) {

  const milesSavedPerDayData = [{
    x: milesSavedPerDay.date,
    y: milesSavedPerDay.distance,
    type: 'scatter',
    mode: 'markers',
    name: 'Miles saved',
    text: milesSavedPerDay.mode,
  }];

  const modesOfTransportData = [{
    values: modesOfTransport.value,
    labels: modesOfTransport.label,
    type: 'pie',
    hole: 0.4,
    hoverinfo: 'label+percent',
  }];

  const fuelSavedTotal = milesSavedTotal / userProfile.autoMPG;
  const ghgReducedTotal = fuelSavedTotal * 19.6;

  const layout = {
    autosize: true,
    showlegend: true,
  };

  return (
      <div id='dashboard-container'>
        <SidebarVisible/>
        <Card.Group id='dashboard-content'itemsPerRow={1}>
          <Card id='overall-card'>
            <Card.Content>
              <Chart chartData={modesOfTransportData} chartLayout={layout}/>
            </Card.Content>
          </Card>
          <Card>
            <Card.Content>
              <Card.Header style={{ marginBottom: 30 }}>Miles Saved Per Day</Card.Header>
            </Card.Content>
          </Card>
          <Card>
            <Card.Content>
              <Card.Header style={{ marginBottom: 30 }}>Monthly GHG Reduced</Card.Header>
              <Chart chartData={milesSavedPerDayData} chartLayout={layout}/>
            </Card.Content>
          </Card>
        </Card.Group>
      </div>
  );
}

DashboardContent.propTypes = {
  milesSavedTotal: PropTypes.number,
  milesSavedPerDay: PropTypes.object,
  modesOfTransport: PropTypes.object,
  userProfile: PropTypes.object,
};

export default DashboardContent;
