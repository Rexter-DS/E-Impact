// Create a way for users to select their "community"
// Show only state info
import React from 'react';
import { Grid, Statistic, Icon } from 'semantic-ui-react';

class PublicCommunity extends React.Component {
  render() {
    return (
        <div id='public-community-container'>
          <Grid centered>
            <Grid.Row>
              <Grid.Column as='h2' textAlign='center'>Honolulu County</Grid.Column>
            </Grid.Row>

            <Grid.Row>
              <Statistic>
                <Statistic.Value>
                  <Icon name='users'/>50
                </Statistic.Value>
                <Statistic.Label>Users</Statistic.Label>
              </Statistic>
            </Grid.Row>

            <Grid.Row>
              <Statistic>
                <Statistic.Value>
                  <Icon name='fire'/>200
                </Statistic.Value>
                <Statistic.Label>gallons of gas saved</Statistic.Label>
              </Statistic>
            </Grid.Row>

            <Grid.Row>
              <Statistic>
                <Statistic.Value>
                  <Icon name='cloud'/>3,000
                </Statistic.Value>
                <Statistic.Label>pounds of CO2 reduced</Statistic.Label>
              </Statistic>
            </Grid.Row>

            <Grid.Row>
              <Statistic>
                <Statistic.Value>
                  <Icon name='car'/>5,000
                </Statistic.Value>
                <Statistic.Label>vehicle mile traveled (VMT) reduced</Statistic.Label>
              </Statistic>
            </Grid.Row>

          </Grid>
        </div>
    );
  }
}

export default PublicCommunity;
