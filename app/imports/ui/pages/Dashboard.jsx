import React, { useState, useEffect } from 'react';
import { Meteor } from 'meteor/meteor';
import { Grid, Container, Card } from 'semantic-ui-react';
import { ResponsiveContainer, LineChart, Line, BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { VictoryPie } from 'victory';
import SidebarVisible from '../components/SideBar';

function Overall() {
  const [totalMiles, setTotalMiles] = useState(0);

  useEffect(() => {
    Meteor.call('getMilesTotal', function (error, result) {
      if (!error) {
        setTotalMiles(result);
      }
    });
  }, [totalMiles]);

  const [fuelSaved, setFuelSaved] = useState(0);

  useEffect(() => {
    Meteor.call('getFuelSaved', function (error, result) {
      if (!error) {
        setFuelSaved(result);
      }
    });
  }, [fuelSaved]);

  const [ghgReduced, setGHGReduced] = useState(0);

  useEffect(() => {
    Meteor.call('getGHGReduced', function (error, result) {
      if (!error) {
        setGHGReduced(result);
      }
    });
  }, [ghgReduced]);

  return (
      <Grid id="overall-container" style={{ height: '100%' }}>
        <Grid.Column stretched>
          <Grid.Row id="overall-total-miles">
            <Grid.Row>
              <Container fluid text style={{ fontSize: '50px' }} textAlign="center">
                { totalMiles }
              </Container>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <Grid.Row>
                  <Menu fluid horizontal="true">
                    <Menu.Item
                        name='Today'
                        active={activeItem === 'Today'}
                        onClick={this.handleItemClick}
                    />
                  </Menu>
                </Grid.Row>
                <Grid.Row>
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
                  </ResponsiveContainer>;
                </Grid.Row>
              </Grid.Column>
              <Grid.Column>
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
              </Grid.Column>
            </Grid.Row>
          </Grid.Row>

          <Grid.Row>
            <Grid.Row>
              <Container fluid text style={{ fontSize: '50px' }} textAlign="center">
                { fuelSaved } lbs
              </Container>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
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
              </Grid.Column>
              <Grid.Column>
                <ResponsiveContainer width='100%' height={250}>
                  <PieChart>
                    <Pie data={data} dataKey="uv" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#8884d8" tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </Grid.Column>
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
      </Grid>
  );
}

function ModesOfTransport() {

  const [modesOfTransport, setModesOfTransport] = useState([]);

  useEffect(() => {
    Meteor.call('getModesOfTransport', function (error, result) {
      if (!error) {
        setModesOfTransport(result);
      }
    });
  }, [modesOfTransport]);

  return (
      <div>
        <VictoryPie
            data={modesOfTransport}
            x="mode"
            y="value"
            colorScale={['#093c69', '#177fc5', '#0c4d85']}
            innerRadius={70}
        />
      </div>
  );
}

function MilesSavedPerDay() {
  const [milesSaved, setMilesSaved] = useState([]);

  useEffect(() => {
    Meteor.call('getMilesSavedPerDay', function (error, result) {
      if (!error) {
        setMilesSaved(result);
      }
    });
  }, [milesSaved]);

  return (
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
  );
}

function MonthlyGHGReport() {
  const [monthlyReport, setMonthlyReport] = useState([]);

  useEffect(() => {
    Meteor.call('getMonthlyGHGReport', function (error, result) {
      if (!error) {
        setMonthlyReport(result);
      }
    });
  }, [monthlyReport]);

  return (
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
  );
}
/* The dashboard that contains graphs that contains the graphs to display data to the user */
function Dashboard() {

  return (
      <div id="dashboard-container">
        <SidebarVisible/>
        <Card.Group id="dashboard-content" itemsPerRow={1}>
          <Card id="overall-card">
            <Card.Content>
              <Card.Header>Overall</Card.Header>
              <Grid container columns={2}>
                <Grid.Column>
                  <Overall/>
                </Grid.Column>
                <Grid.Column>
                  <ModesOfTransport/>
                </Grid.Column>
              </Grid>
            </Card.Content>
          </Card>
          <Card>
            <Card.Content>
              <Card.Header style={{ marginBottom: 30 }}>Miles Saved Per Day</Card.Header>
              <MilesSavedPerDay/>
            </Card.Content>
          </Card>
          <Card>
            <Card.Content>
              <Card.Header style={{ marginBottom: 30 }}>Monthly GHG Reduced</Card.Header>
              <MonthlyGHGReport/>
            </Card.Content>
          </Card>
        </Card.Group>
      </div>
  );
}

export default Dashboard;
