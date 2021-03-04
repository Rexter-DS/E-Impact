import { Meteor } from 'meteor/meteor';
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Card } from 'semantic-ui-react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import SidebarVisible from './SideBar';
import PieChart from './PieChart';

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

function DashboardContent({ trips, tripCount, modesOfTransport, userProfile }) {

  // modesOfTransport is returned by trip collection as modesOfTransport = [value, label].
  const modesOfTransportValue = modesOfTransport[0];
  const modesOfTransportLabel = modesOfTransport[1];

  return (
      <div id="dashboard-container">
        <SidebarVisible/>
        <Card.Group id="dashboard-content" itemsPerRow={1}>
          <Card id="overall-card">
            <Card.Content>
              <PieChart dataValues={modesOfTransportValue} dataLabels={modesOfTransportLabel}/>
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

DashboardContent.propTypes = {
  trips: PropTypes.array,
  tripCount: PropTypes.number,
  modesOfTransport: PropTypes.array,
  userProfile: PropTypes.object,
};

export default DashboardContent;
