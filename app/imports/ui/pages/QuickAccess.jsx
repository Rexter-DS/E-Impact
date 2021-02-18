import React, { useState } from 'react';
import { Grid, Form, Input, Select } from 'semantic-ui-react';
// A suggestions portion could be added below the produced GHG section.
function QuickAccess() {
  // Hooks.
  const [miles, setMiles] = useState(1);
  const [mpg, setMpg] = useState(1);
  const [ghg, setGhg] = useState(0);
  // Updates the generated greenhouse gases.
  const updateProduced = () => {
    setGhg((miles / mpg) * 8887);
  };
  // Handles of Hooks.
  const handleMiles = e => {
    setMiles(e.target.value);
    updateProduced();
  };
  const handleMpg = e => {
    setMpg(e.target.value);
    updateProduced();
  };
  return (
      <Grid id="quick-access-container" centered>
        <Grid.Row>
          <img src={'/images/QuickAccessLogo.png'} height={102} width={271} alt="Quick Access"/>
        </Grid.Row>
        <Grid.Row>
          <Form>
            <Form.Field
                control={Input}
                label="Distance traveled (mi)"
                onChange={e => handleMiles(e)}
            />
            <Form.Field
                control={Select}
                label="Mode of transportation"
                options={[
                  { text: 'Bike', value: 'bike' },
                  { text: 'Bus', value: 'bus' },
                  { text: 'Car', value: 'car' },
                  { text: 'Foot', value: 'foot' },
                ]}
            />
            <Form.Field
                control={Input}
                label="Vehicle miles per gallon"
                onChange={e => handleMpg(e)}
            />
          </Form>
        </Grid.Row>
        <Grid.Row>
          <p>Miles Traveled: {miles}; Mileage Of Vehicle(if used): {mpg}</p>
          <label>You produced {ghg} grams of CO2/gallon. </label>
        </Grid.Row>
      </Grid>
  );
}
export default QuickAccess;
