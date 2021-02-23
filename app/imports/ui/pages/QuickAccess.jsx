import React, { useState } from 'react';
import { Grid, Form, Card } from 'semantic-ui-react';
import '../../../client/style.css';
// A suggestions portion could be added below the produced GHG section.
function QuickAccess() {
  const [miles, setMiles] = useState(1);
  const [mpg, setMpg] = useState(1);
  const [ghg, setGhg] = useState(0);
  // Uniforms library using AutoForm with Form.Group width='equal' for spacing issue
  const updateProduced = () => {
    setGhg((miles / mpg) * 19.64);
  };
  const handleMiles = e => {
    setMiles(e.target.value);
    updateProduced();
  };
  const handleMpg = e => {
    setMpg(e.target.value);
    updateProduced();
  };

  return (
      <div className="quick-access-container">
        <div className="quick-access-navbar">
          <a href={'/#'}>
            <img src={'/images/EImpactLogoWhite.png'} height={131.27} width={300} alt="Home"/>
          </a>
        </div>
        <div className="ui center aligned container" style={{ textAlign: 'left' }}>
          <Grid className="quick-access-grid">
            <Grid.Row centered>
              <img src={'/images/QuickAccessLogo.png'} height={102} width={271} alt="Quick Access"/>
            </Grid.Row>
            <Grid.Row floated="left" centered>
              <Grid.Column width={4}>
                <label>Distance Traveled(mi)</label>
              </Grid.Column>
              <Grid.Column width={4}>
                <Form align="left">
                  <Form.Field>
                    <input type="text" placeholder="ex. 0-9" maxLength="5" onChange={e => handleMiles(e)}/>
                  </Form.Field>
                </Form>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row floated="left" centered>
              <Grid.Column width={4} >
                <label>Mode of Transport</label>
              </Grid.Column>
              <Grid.Column>
                <Form>
                  <Form.Field width={4}>
                    <select>
                      <option value="">Select Mode</option>
                      <option value="Bike">Bike</option>
                      <option value="Bus">Bus</option>
                      <option value="Car">Car</option>
                      <option value="Carpool">Carpool</option>
                      <option value="Foot">Foot</option>
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
                <Form>
                  <Form.Field inline>
                    <input type="text" placeholder="ex. 0-9" maxLength="4" onChange={e => handleMpg(e)}/>
                  </Form.Field>
                </Form>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <p>Miles Traveled: {miles}; Mileage Of Vehicle(if used): {mpg}</p>
              <label>You produced {ghg} lb. of CO2/gallon. </label>
            </Grid.Row>
            <Grid.Row centered>
              <Grid.Column width={4}>
                <Card>
                  <Card.Content>GHG Produced</Card.Content>
                  <Card.Description>You produced a total of {ghg.toFixed(2)} lb. of Carbon Dioxide(CO2)</Card.Description>
                </Card>
              </Grid.Column>
              <Grid.Column width={4}>
                <Card href='https://projectfootprint.com/'>
                  <Card.Content>Plant a Tree</Card.Content>
                </Card>
              </Grid.Column>
              <Grid.Column width={4}>
                <Card>
                  <Card.Content>You could save with an electric car</Card.Content>
                </Card>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
      </div>
  );
}
export default QuickAccess;
