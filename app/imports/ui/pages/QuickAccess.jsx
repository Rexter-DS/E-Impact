import React, { useState } from 'react';
import { Grid } from 'semantic-ui-react';
import qaLogo from '../../../public/images/QuickAccessLogo.png';

function QuickAccess() {
  const [miles, setMiles] = useState('');
  const [mpg, setMpg] = useState('');
  const [ghg, setGhg] = useState(1);
  return (
      <div className="base">
        <form className="main">
          <img src={qaLogo} height={102} width={271} alt="Quick Access"/>
          <Grid columns={2} rows={3}>
            <Grid.Row columns={2}>
              <Grid.Column>
                <label>Distance traveled(mi)</label>
              </Grid.Column>
              <Grid.Column>
                <input type="text" value={miles} placeholder="0" onChange={e => setMiles(e.target.value)}/>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={2}>
              <Grid.Column>
                <label>Mode of Transportation</label>
              </Grid.Column>
              <Grid.Column>
                <select>
                  <option>Bike</option>
                  <option>Bus</option>
                  <option>Car</option>
                  <option>Foot</option>
                </select>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={2}>
              <Grid.Column>
                <label>Vehicle Miles Per Gallon</label>
              </Grid.Column>
              <Grid.Column>
                <form>
                  <input type="text" value={mpg} placeholder='0' onChange={e => setMpg(e.target.value)}/>
                </form>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </form>
        <p>Miles Traveled: {miles}; Mileage Of Vehicle(if used): {mpg}</p>
        <label onInput={() => setGhg((miles / mpg) * 8887)}>You produced {ghg} grams of CO2/gallon. </label>
      </div>
  );
}
export default QuickAccess;
