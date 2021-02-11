import React from 'react';
import { Grid, Button, Icon } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import LandingNavBar from '../components/LandingNavBar';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return (
        <div id="landing">
          <LandingNavBar/>

          {/* This controls the top half of the landing page */}
          <div style={{ paddingLeft: '250px', paddingRight: '250px' }} className="ui center aligned container">
            <p>Help keep our air clean and monitor your Green House Gas emissions!</p>
            <hr/>
          </div>

          {/* This controls the bottom half of the landing page */}
          <Grid id="landing-bottom" verticalAlign='middle' textAlign='center' container>
            <Grid.Column width={8}>
              <h1>Use our GHC estimator to calculate your GHG emissions for a single trip</h1>
              <Button as={NavLink} exact to='/#' animated>
                <Button.Content visible>Take me there!</Button.Content>
                <Button.Content hidden>
                  <Icon name='long arrow alternate right'/>
                </Button.Content>
              </Button>
            </Grid.Column>
            <Grid.Column width={8}>
              <h1>Create an account to keep track of the emissions of your daily transit</h1>
              <Button as={NavLink} exact to='/#' animated>
                <Button.Content visible>Take me there!</Button.Content>
                <Button.Content hidden>
                  <Icon name='long arrow alternate right'/>
                </Button.Content>
              </Button>
            </Grid.Column>
          </Grid>

        </div>
    );
  }
}

export default Landing;
