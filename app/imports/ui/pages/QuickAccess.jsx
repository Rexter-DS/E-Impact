import React, { useState } from 'react';
import { Grid, Form, Card, Image, Header, Popup, Button, Icon } from 'semantic-ui-react';
import '../../../client/style.css';

const QuickAccess = () => {
  const [miles, setMiles] = useState(1);
  const [mpg, setMpg] = useState(1);
  const [ghg, setGhg] = useState(0);
  const [transportationMethod, setTransportation] = useState('produced');
  // TODO: Maybe a brief description would be helpful. What, Why, Where, answer why the user wants or needs to be on this page. Shaded box, separate logo and intro.
  // TODO: Look into suggestion regarding withTracker() for constants?
  const updateProduced = (updatedMiles, updatedMpg) => {
    setGhg((updatedMiles / updatedMpg) * 19.64);
  };
  const handleMiles = newMiles => {
    if (newMiles.target.value === '') {
      setMiles(1);
      updateProduced(1, mpg);
    } else {
      setMiles(newMiles.target.value);
      updateProduced(newMiles.target.value, mpg);
    }
  };
  const handleMpg = newMpg => {
    if (newMpg.target.value === '' || newMpg.target.value === '0') {
      setMpg(1);
      updateProduced(miles, 1);
    } else {
      setMpg(newMpg.target.value);
      updateProduced(miles, newMpg.target.value);
    }
  };
  const handleTransportation = e => {
    if (e.target.value === 'car') {
      setTransportation('produced');
    } else if (e.target.value !== 'select mode') {
      setTransportation('reduced');
    }
  };

  return (
      <div className="quick-access-container">
        <div className="quick-access-navbar">
          <a href={'/#'}>
            <Image src={'/images/EImpactLogoWhite.png'} height={131.27} width={300} alt="Home"/>
          </a>
        </div>
        <div className="quick-access-form">
          <Grid className="quick-access-grid">
            <Grid.Row centered>
              <Image src={'/images/QuickAccessLogo.png'} height={102} width={271} alt="Quick Access"/>
            </Grid.Row>
            <Grid.Row centered>
              <Grid.Column width={4}>
                <Popup
                    trigger={ <Button secondary>What is the Quick Access Page?</Button>
                    }
                    content="Welcome to the QuickAccess Page, the purpose of this page is allow potential users to test this website before building an account."
                    position="left center"
                    inverted
                />
              </Grid.Column>
              <Grid.Column width={4}>
                <Popup
                    trigger={ <Button secondary>How Does this Page Work?</Button>
                    }
                    content="Input any travel information below and the mileage of your most used vehicle to calculate your potential Green House Gas(CO2) emissions."
                    position="right center"
                    inverted
                />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row floated="left" centered>
              <Grid.Column width={4}>
                <Header as="h3">Distance Traveled(mi)</Header>
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
                <Header as="h3">Mode of Transport</Header>
              </Grid.Column>
              <Grid.Column width={4}>
                <Form>
                  <Form.Field>
                    <select onChange={e => handleTransportation(e)}>
                      <option value="select mode">Select Mode</option>
                      <option value="bike">Bike</option>
                      <option value="bus">Bus</option>
                      <option value="car">Car</option>
                      <option value="carpool">Carpool</option>
                      <option value="foot">Foot</option>
                      <option value="remote work">Remote Work</option>
                    </select>
                  </Form.Field>
                </Form>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row floated="left" centered>
              <Grid.Column width={4}>
                <Header as="h3">Mileage of test vehicle</Header>
                <Popup
                    trigger={ <Icon name="question circle outline"/>
                    }
                    content="If your mode of transportation wasn't your car, inputting the mpg of your car can be used to determine how much ghg you saved by not using it."
                    size="mini"
                />
              </Grid.Column>
              <Grid.Column width={4}>
                <Form align="left">
                  <Form.Field>
                    <input type="number" placeholder="ex. 0-9" maxLength="4" onChange={e => handleMpg(e)}/>
                  </Form.Field>
                </Form>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row centered>
              <Grid.Column width={5}>
                <Card>
                  {// Temporary Image from:https://favpng.com/png_view/array-health-greenhouse-gas-lyocell-material-logo-png/M35VccaZ
                  }
                  <Image src={'/images/GHGLogo.png'} wrapped ui={false} alt="GHG Logo"/>
                  <Card.Content>
                    <Card.Header>GHG Produced</Card.Header>
                    <Card.Description>You {transportationMethod} a total of {ghg.toFixed(2)} lb. of Carbon Dioxide(CO2)</Card.Description>
                  </Card.Content>
                </Card>
              </Grid.Column>
              <Grid.Column width={5}>
                <Card href='https://projectfootprint.com/'>
                  <Image src={'/images/ProjectFootPrint.png'} width={100} height={100} wrapped ui={false} alt="PFP Logo"/>
                  <Card.Content>
                    <Card.Header>Reduce Your CO2 Footprint</Card.Header>
                    <Card.Description>
                      Project Footprint is a nonprofit organization aiming to plant native King Koa trees and encourage others to make conscious efforts at reducing their carbon footprint.
                    </Card.Description>
                  </Card.Content>
                </Card>
              </Grid.Column>
              <Grid.Column width={5}>
                <Card>
                  {// Tmporary Image from:https://www.cleanpng.com/png-cost-reduction-saving-money-service-1541224/
                    }
                  <Image src={'/images/SavingMoney.png'} wrapped ui={false} alt="Saving Money Logo"/>
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
};
export default QuickAccess;
