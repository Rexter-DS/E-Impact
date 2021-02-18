import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { Grid, Menu, Image, Container, Header } from 'semantic-ui-react';
import { ResponsiveContainer, LineChart, Line, PieChart, Pie, BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import SidebarVisible from '../components/SideBar';

function BarGraph(data) {
  return (
      <ResponsiveContainer width='100%' height={250}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" tick={{ fill: 'white' }}/>
          <YAxis tick={{ fill: 'white' }}/>
          <Tooltip />
          <Legend />
          <Bar dataKey="pv" fill="#8884d8" />
          <Bar dataKey="uv" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
  );
}

function LineGraph(data) {
  return (
      <ResponsiveContainer width='100%' height={250}>
        <LineChart data={data}
                   margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='name' tick={{ fill: 'white' }}/>
          <YAxis tick={{ fill: 'white' }}/>
          <Tooltip />
          <Legend />
          <Line type='monotone' dataKey='pv' stroke='#8884d8' />
          <Line type='monotone' dataKey='uv' stroke='#82ca9d' />
        </LineChart>
      </ResponsiveContainer>
  );
}

const customizedPieGraphLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
  const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));

  return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline={"central"}>
        {`${(percent * 100).toFixed(0)}%`}
      </text>
  );
}

function PieGraph(props) {
  return (
      <ResponsiveContainer>
        <PieChart>
          <Pie data={props} cx="50%" cy="50%" label={customizedPieGraphLabel} outerRadius={100} fill="#8884d8" />
        </PieChart>
      </ResponsiveContainer>
  );
}

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
      <Grid id="overall-container" stretched container padding="vertically" columns={3}>
        <Grid.Column>
          <Grid.Row>
            <Container text>
              <Header>Overall</Header>
            </Container>
          </Grid.Row>
          <Grid.Row>
            { totalMiles } Total Miles
          </Grid.Row>
        </Grid.Column>

        <Grid.Column>
          <Grid.Row>
            { fuelSaved } of fuel saved
          </Grid.Row>
          <Grid.Row>
            { ghgReduced } of GHG reduced
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
/* The dashboard that contains graphs that contains the graphs to display data to the user */
function Dashboard() {

  Meteor.call('getData', function (error, result) {
    if (error) {
      console.log(error.reason);
    }
    if (result) {
      console.log(result);
    }
  });

  Meteor.call('getModesOfTransport');
  return (
      <div id="dashboard-container">
        <SidebarVisible/>
        <Overall/>
      </div>
  );
}

export default Dashboard;
