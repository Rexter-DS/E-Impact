import React from 'react';
import { Grid, Menu } from 'semantic-ui-react';
import { ResponsiveContainer, LineChart, Line, PieChart, Pie, BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import NavBar from '../components/NavBar';

/* temporary data for the graphs */
const data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

/* The dashboard that contains graphs that contains the graphs to display data to the user */
class Dashboard extends React.Component {
  state = {};

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name });
  };

  render() {
    const { activeItem } = this.state;

    return (
        <div id="dashboard-container">

          <NavBar/>

          { /* Contains the graphs that dislays the data */ }
          <Grid id='dashboard' columns={2} padded="vertically" verticalAlign='middle' container>
            <Grid.Row>
              <Grid.Column>
                <Grid.Row>
                  <Menu fluid horizontal>
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
          </Grid>
        </div>
    );
  }
}
export default Dashboard;
