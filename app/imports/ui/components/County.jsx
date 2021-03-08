import React from 'react';
import { Grid, Statistic, Icon, Progress } from 'semantic-ui-react';

class County extends React.Component {
  render() {
    return (
            <Grid centered>
              <Grid.Row>
                <Grid.Column as="h2" textAlign='center'>Honolulu County</Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column width={5} textAlign='center'>    <Statistic>
                  <Statistic.Value>
                    <Icon name='users' />50
                  </Statistic.Value>
                  <Statistic.Label>users</Statistic.Label>
                </Statistic>
                </Grid.Column>
                <Grid.Column width={5}>
                  <Progress value='50' total='100' progress='percent' label="2021 GOAL: 100 USERS" color="blue"/></Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column width={5} textAlign='center'>    <Statistic>
                  <Statistic.Value><Icon name='fire'/>200</Statistic.Value>
                  <Statistic.Label>gallons of gas saved</Statistic.Label>
                </Statistic>
                </Grid.Column>
                <Grid.Column width={5}>
                  <Progress value='200' total='1000' progress='percent' label="2021 GOAL: 1,000 GALLONS OF GAS SAVED" color="blue"/></Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column width={5} textAlign='center'>    <Statistic>
                  <Statistic.Value><Icon name='cloud'/>3,000</Statistic.Value>
                  <Statistic.Label>pounds of CO2 reduced</Statistic.Label>
                </Statistic>
                </Grid.Column>
                <Grid.Column width={5}>
                  <Progress value='3000' total='10000' progress='percent' label="2021 GOAL: 10,000 POUNDS OF CO2 REDUCED" color="blue"/></Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column width={5} textAlign='center'>    <Statistic>
                  <Statistic.Value><Icon name='car'/>5,000</Statistic.Value>
                  <Statistic.Label>vehicle miles traveled (VMT) reduced</Statistic.Label>
                </Statistic>
                </Grid.Column>
                <Grid.Column width={5}>
                  <Progress value='5000' total='20000' progress='percent' label="2021 GOAL: 20,000 VMT REDUCED" color="blue"/></Grid.Column>
              </Grid.Row>
            </Grid>
    );
  }
}

export default County;
