import React from 'react';
import { Grid, Button, Icon, Header } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import LandingNavBar from '../components/LandingNavBar';
import Footer from '../components/Footer';
import Info1 from '../components/Info1';
import Info2 from '../components/Info2';
import TempAddData from '../components/TempAddData';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return (
        <div id="landing">
          <LandingNavBar/>
            {/* This controls the top half of the landing page */}
            <div id="greet">
                <Header size='huge' textAlign='center'>Welcome to E-Impact!</Header>
              <div style={{ paddingLeft: '250px', paddingRight: '250px', color:'black' }} className="ui center aligned container">
                <p>Help keep our air clean by monitoring your Green House Gas emissions!</p>
                <TempAddData/>
                <hr/>
              </div>
            </div>
          {/* This controls the bottom half of the landing page */}
          <Info1/>
          <hr/>
          <Info2/>
          <br/>
          <Footer id={'landing-footer'}/>
        </div>

    );
  }
}

export default Landing;
