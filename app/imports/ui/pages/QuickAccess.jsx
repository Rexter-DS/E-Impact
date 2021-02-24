import React, { useState } from 'react';
import { Grid, Form, Card } from 'semantic-ui-react';
import '../../../client/style.css';
// A suggestions portion could be added below the produced GHG section.
function QuickAccess() {
  const [miles, setMiles] = useState(1);
  const [mpg, setMpg] = useState(1);
  const [ghg, setGhg] = useState(0);
  const [transportationMethod, setTransportation] = useState('produced');
  // Update handle functions for numerical values only. e is event not target.value
  // Underscore methods for numerical verification.
  // Description or hover icon to "pop up" text over Mileage.
  // Maybe a brief description would be helpful.
  // Additional Help page for additional pages to describe the use of that page. Why/What do I do on this page.
  // What, Why, Where, answer why the user wants or needs to be on this page.
  // Change the sizing of the white background.
  const updateProduced = (x, y) => {
    setGhg((x / y) * 19.64);
  };
  const handleMiles = e => {
    if (e.target.value === '') {
      setMiles(1);
      updateProduced(1, mpg);
    } else {
      setMiles(e.target.value);
      updateProduced(e.target.value, mpg);
    }
  };
  const handleMpg = e => {
    if (e.target.value === '' || e.target.value === '0') {
      setMpg(1);
      updateProduced(miles, 1);
    } else {
      setMpg(e.target.value);
      updateProduced(miles, e.target.value);
    }
  };
  const handleTransportation = e => {
    if (e.target.value === '4') {
      setTransportation('produced');
    } else if (e.target.value !== '1') {
      setTransportation('saved');
    }
  };

  return (
      <div className="quick-access-container">
        <div className="quick-access-navbar">
          <a href={'/#'}>
            <img src={'/images/EImpactLogoWhite.png'} height={131.27} width={300} alt="Home"/>
          </a>
        </div>
        <div className="ui center aligned container">
          <Grid className="quick-access-grid">
            <Grid.Row centered>
              <img src={'/images/QuickAccessLogo.png'} height={102} width={271} alt="Quick Access"/>
            </Grid.Row>
            <Grid.Row centered>
              <Grid.Column width={12}>
                <h4>
                  This is the QuickAccess Page which allows potential users to test this website before building an account.
                  Input any travel information below and the mileage of your most used vehicle to calculate your potential Green House Gas(CO2) emissions.
                </h4>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row floated="left" centered>
              <Grid.Column width={4}>
                <label>Distance Traveled(mi)</label>
              </Grid.Column>
              <Grid.Column width={4}>
                <Form align="left">
                  <Form.Field>
                    <input type="number" placeholder="ex. 0-9" maxLength="5" onChange={e => handleMiles(e)}/>
                  </Form.Field>
                </Form>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row floated="left" centered>
              <Grid.Column width={4} >
                <label>Mode of Transport</label>
              </Grid.Column>
              <Grid.Column width={4}>
                <Form>
                  <Form.Field>
                    <select onChange={e => handleTransportation(e)}>
                      <option value="1">Select Mode</option>
                      <option value="2">Bike</option>
                      <option value="3">Bus</option>
                      <option value="4">Car</option>
                      <option value="5">Carpool</option>
                      <option value="6">Foot</option>
                      <option value="7">Remote Work</option>
                    </select>
                  </Form.Field>
                </Form>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row floated="left" centered>
              <Grid.Column width={4}>
                <label>Mileage of test vehicle</label>
              </Grid.Column>
              <Grid.Column width={4}>
                <Form align="left">
                  <Form.Field>
                    <input type="number" placeholder="ex. 0-9" maxLength="4" onChange={e => handleMpg(e)}/>
                  </Form.Field>
                </Form>
              </Grid.Column>
            </Grid.Row>
            {/* <Grid.Row> */}
            {/* <p>Miles Traveled: {miles}; Mileage Of Vehicle(if used): {mpg}</p> */}
            {/* <label>You produced {ghg} lb. of CO2/gallon. </label> */}
            {/* </Grid.Row> */}
            <Grid.Row centered>
              <Grid.Column width={4}>
                <Card>
                  <Card.Content>
                    <Card.Header>GHG Produced</Card.Header>
                    <Card.Description>You {transportationMethod} a total of {ghg.toFixed(2)} lb. of Carbon Dioxide(CO2)</Card.Description>
                  </Card.Content>
                </Card>
              </Grid.Column>
              <Grid.Column width={4}>
                <Card href='https://projectfootprint.com/'>
                  <Card.Content>
                    <Card.Header>Reduce Your CO2 Footprint</Card.Header>
                    <Card.Description>
                      Project Footprint is a nonprofit organization aiming to plant native King Koa trees and encourage others to make conscious efforts at reducing their carbon footprint.
                    </Card.Description>
                  </Card.Content>
                </Card>
              </Grid.Column>
              <Grid.Column width={4}>
                <Card>
                  <Card.Content>
                    <Card.Header>Save Gas Money</Card.Header>
                    <Card.Description>Using an electric car cuts the cost of Gas every month and reduces the amount of Green House Gases you produce.</Card.Description>
                  </Card.Content>
                </Card>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
      </div>
  );
}
export default QuickAccess;
