import React, { useState } from 'react';
import { Grid, Form, Card } from 'semantic-ui-react';
// A suggestions portion could be added below the produced GHG section.
function QuickAccess() {
  const [miles, setMiles] = useState(1);
  const [mpg, setMpg] = useState(1);
  const [ghg, setGhg] = useState(0);
  // Uniforms library using AutoForm with Form.Group width='equal' for spacing issue
  const updateProduced = () => {
    setGhg((miles / mpg) * 19.57);
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
        <Grid>
          <Grid.Row>
            <img src={'/images/QuickAccessLogo.png'} height={102} width={271} alt="Quick Access"/>
          </Grid.Row>
          <Grid.Row floated="center">
            <Form align="left">
              <Form.Field inline>
                <label>Distance Traveled(mi)</label>
                <input type="text" placeholder="ex. 0-9" onChange={e => handleMiles(e)}/>
              </Form.Field>
              <Form.Field inline>
                <label>Mode of Transport</label>
                <select>
                  <option value="">Select Mode</option>
                  <option value="Bike">Bike</option>
                  <option value="Bus">Bus</option>
                  <option value="Car">Car</option>
                  <option value="Carpool">Carpool</option>
                  <option value="Foot">Foot</option>
                </select>
              </Form.Field>
              <Form.Field inline>
                <label>Mileage of test vehicle</label>
                <input type="text" placeholder="ex. 0-9" onChange={e => handleMpg(e)}/>
              </Form.Field>
            </Form>
          </Grid.Row>
          <Grid.Row>
            <p>Miles Traveled: {miles}; Mileage Of Vehicle(if used): {mpg}</p>
            <label>You produced {ghg} lb. of CO2/gallon. </label>
          </Grid.Row>
          <Grid.Row>
            <Card>
              <Card.Content>GHG Produced</Card.Content>
              <Card.Description>You produced {ghg} lb. of Co2/gallon</Card.Description>
            </Card>
          </Grid.Row>
        </Grid>
      </div>
  );
}
export default QuickAccess;
