import React, { useState } from 'react';
import { Grid, Form, Input, Select } from 'semantic-ui-react';

function QuickAccess() {
  const [miles, setMiles] = useState('');
  const [mpg, setMpg] = useState('');
  const [ghg, setGhg] = useState(1);
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
                onChange={e => setMiles(e.target.value)}
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
                onChange={e => setMpg(e.target.value)}
            />
          </Form>
        </Grid.Row>
        <Grid.Row>
          <p>Miles Traveled: {miles}; Mileage Of Vehicle(if used): {mpg}</p>
          <label onInput={() => setGhg((miles / mpg) * 8887)}>You produced {ghg} grams of CO2/gallon. </label>
        </Grid.Row>
      </Grid>
  );
}
export default QuickAccess;
