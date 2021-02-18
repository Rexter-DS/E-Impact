import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { Grid, Container, Header } from 'semantic-ui-react';
import { ResponsiveContainer, LineChart, Line, PieChart, Pie, BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import SidebarVisible from '../components/SideBar';

const customizedPieGraphLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
  const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));

  return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline={"central"}>
        {`${(percent * 100).toFixed(0)}%`}
      </text>
  );
};

function Overall() {
  const [totalMiles, setTotalMiles] = useState(0);
  const [fuelSaved, setFuelSaved] = useState(0);
  const [ghgReduced, setGHGReduced] = useState(0);
  const [modesOfTransport, setModesOfTransport] = useState([]);

  Meteor.call('getMilesTotal', function (error, result) {
    if (!error) {
      setTotalMiles(result);
    }
  });

  Meteor.call('getFuelSaved', function (error, result) {
    if (!error) {
      setFuelSaved(result);
    }
  });

  Meteor.call('getGHGReduced', function (error, result) {
    if (!error) {
      setGHGReduced(result);
    }
  });

  Meteor.call('getModesOfTransport', function (error, result) {
    if (!error) {
      setModesOfTransport(result);
    }
  });

  return (
      <Grid id="overall-container" columns={3}>
        <Grid.Column id="overall-left-grid">
          <Grid.Row id="overall-text">
            <Container fluid text>
              <Header>Overall</Header>
            </Container>
          </Grid.Row>
          <Grid.Row id="overall-total-miles">
            <Grid.Row>
              <Container fluid text style={{ fontSize: '50px' }} textAlign="center">
                { totalMiles }
              </Container>
            </Grid.Row>
            <Grid.Row>
              <Container fluid text textAlign="center">
                Total Miles
              </Container>
            </Grid.Row>
          </Grid.Row>
        </Grid.Column>

        <Grid.Column stretched>
          <Grid.Row>
            <Grid.Row>
              <Container fluid text style={{ fontSize: '50px' }} textAlign="center">
                { fuelSaved } lbs
              </Container>
            </Grid.Row>
            <Grid.Row>
              <Container fluid text textAlign="center">
                of fuel saved
              </Container>
            </Grid.Row>
          </Grid.Row>
          <Grid.Row>
            <Grid.Row>
              <Container fluid text style={{ fontSize: '50px' }} textAlign="center">
                { ghgReduced } lbs
              </Container>
            </Grid.Row>
            <Grid.Row>
              <Container fluid text textAlign="center">
                of GHG reduced
              </Container>
            </Grid.Row>
          </Grid.Row>
        </Grid.Column>

        <Grid.Column>
          <ResponsiveContainer width='100%' height={250}>
            <PieChart>
              <Pie data={modesOfTransport} dataKey="value" cx="50%" cy="50%" label={customizedPieGraphLabel} outerRadius={100} fill="#8884d8" />
            </PieChart>
          </ResponsiveContainer>
        </Grid.Column>
      </Grid>
  );
}

function MilesSavedPerDay() {
  const [milesSaved, setMilesSaved] = useState([]);

  Meteor.call('getMilesSavedPerDay', function (error, result) {
    if (!error) {
      setMilesSaved(result);
    }
  });

  return (
      <Grid id="miles-saved-container" column={1}>
        <Grid.Column>
          <Grid.Row id="miles-saved-header">
            <Container id="miles-saved-header-container" fluid text>
              <Header>Miles saved per day</Header>
            </Container>
          </Grid.Row>
          <Grid.Row id="miles-saved-graph">
            <ResponsiveContainer width='100%' height={250}>
              <BarChart data={milesSaved}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="miles" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </Grid.Row>
        </Grid.Column>
      </Grid>
  );
}

function MonthlyGHGReport() {
  const [monthlyReport, setMonthlyReport] = useState([]);

  Meteor.call('getMonthlyGHGReport', function (error, result) {
    if (!error) {
      setMonthlyReport(result);
    }
  });

  return (
      <Grid id="monthly-report-container" columns={1}>
        <Grid.Column>
          <Grid.Row id="monthly-report-header">
            <Container id="monthly-report-header-container" fluid text>
              <Header>Monthly GHG report</Header>
            </Container>
          </Grid.Row>
          <Grid.Row id="monthly-report-graph">
            <ResponsiveContainer width='100%' height={250}>
              <LineChart data={monthlyReport}
                         margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis dataKey='month'/>
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type='monotone' dataKey='GHGReduced' stroke='#8884d8' />
              </LineChart>
            </ResponsiveContainer>
          </Grid.Row>
        </Grid.Column>
      </Grid>
  );
}
/* The dashboard that contains graphs that contains the graphs to display data to the user */
function Dashboard() {

  Meteor.call('getMonthlyGHGReport');
  return (
      <div id="dashboard-container">
        <SidebarVisible/>
        <Overall/>
        <MilesSavedPerDay/>
        <MonthlyGHGReport/>
      </div>
  );
}

export default Dashboard;
