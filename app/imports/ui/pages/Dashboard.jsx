import React, { useState, useEffect } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker, useTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Grid, Container, Card } from 'semantic-ui-react';
import { ResponsiveContainer, LineChart, Line, BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { VictoryPie } from 'victory';
import { Trips } from '../../api/trip/TripCollection';
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
              <Container fluid text textAlign="center">
                Total Miles
              </Container>
            </Grid.Row>
          </Grid.Row>

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
function Dashboard(props) {

  console.log(props.trips);

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

Dashboard.propTypes = {
  trips: PropTypes.array,
  ready: PropTypes.bool.isRequired,
};

export default withTracker(() => {
  const subscription = Trips.subscribeTrip();
  return {
    trips: Trips.find({ owner: 'admin@foo.com' }).fetch(),
    ready: subscription.ready(),
  };
})(Dashboard);
