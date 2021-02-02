import React from 'react';
import { Grid, Image } from 'semantic-ui-react';
import LandingNavBar from '../components/LandingNavBar';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {

    const pageStyle = {
      backgroundColor: '#FFFFFF',
    };

    return (
        <div style={pageStyle} id="landing">
          <LandingNavBar/>
          <Grid id='landing-page' verticalAlign='middle' textAlign='center' container>
            <Image size='large' verticalAlign='center' src="/images/new-logo.png"/>
            <p>Accelerating a Sustainable Future for Hawaii,
              Enhancing the Lives of Our Communities and Creating Value for Our Shareholders</p>
          </Grid>

        </div>
    );
  }
}

export default Landing;
