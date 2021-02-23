import React from 'react';
import { Grid, Statistic, Icon, Progress, Divider, Header, Card } from 'semantic-ui-react';
import SidebarVisible from '../components/SideBar';
import Map from '../components/Map';

class Community extends React.Component {
  render() {
    return (
     <div id='community-container'>
       <SidebarVisible/>
       <div id='community-map'>
        <Map/>
       </div>
       <div id='community-bottom'>
       <Grid centered>
         <Grid.Row>
           <Grid.Column as="h2" textAlign='center'>Honolulu County</Grid.Column>
         </Grid.Row>
         <Grid.Row>
           <Grid.Column width={5}>    <Statistic>
             <Statistic.Value>
               <Icon name='users' />50
             </Statistic.Value>
             <Statistic.Label>users</Statistic.Label>
           </Statistic>
           </Grid.Column>
             <Grid.Column width={5}>
             <Progress value='50' total='100' progress='percent' label="2021 GOAL: 100 USERS" color="blue"/></Grid.Column>
         </Grid.Row>
         <Grid.Row>
           <Grid.Column width={5}>    <Statistic>
             <Statistic.Value><Icon name='fire'/>200</Statistic.Value>
             <Statistic.Label>gallons of gas saved</Statistic.Label>
           </Statistic>
           </Grid.Column>
           <Grid.Column width={5}>
             <Progress value='200' total='1000' progress='percent' label="2021 GOAL: 1,000 GALLONS OF GAS SAVED" color="blue"/></Grid.Column>
         </Grid.Row>
         <Grid.Row>
           <Grid.Column width={5}>    <Statistic>
             <Statistic.Value><Icon name='cloud'/>3,000</Statistic.Value>
             <Statistic.Label>pounds of CO2 reduced</Statistic.Label>
           </Statistic>
           </Grid.Column>
           <Grid.Column width={5}>
             <Progress value='3000' total='10000' progress='percent' label="2021 GOAL: 10,000 POUNDS OF CO2 REDUCED" color="blue"/></Grid.Column>
         </Grid.Row>
         <Grid.Row>
           <Grid.Column width={5}>    <Statistic>
             <Statistic.Value><Icon name='car'/>5,000</Statistic.Value>
             <Statistic.Label>vehicle miles traveled (VMT) reduced</Statistic.Label>
           </Statistic>
           </Grid.Column>
           <Grid.Column width={5}>
             <Progress value='5000' total='20000' progress='percent' label="2021 GOAL: 20,000 VMT REDUCED" color="blue"/></Grid.Column>
         </Grid.Row>
       </Grid>
       <Divider horizontal>
         <Header as='h3'>
           Get Involved
         </Header>
       </Divider>
       <Card.Group centered itemsPerRow={6}>
         <Card href='https://www.hawaiianelectric.com/products-and-services/electric-vehicles' target='_blank'>
           <Card.Content
               style={{
                 height: '200px',
                 backgroundImage: 'url(/images/EV.jpeg)',
                 backgroundSize: 'cover',
               }}
           />
           <Card.Content id="card-bottom" textAlign="center">
             Switch to EV or Hybrid
           </Card.Content>
         </Card>
         <Card href='http://hidot.hawaii.gov/highways/rideshare/match/' target='_blank'>
           <Card.Content
               style={{
                 height: '200px',
                 backgroundImage: 'url(/images/Carpool.jpg)',
                 backgroundSize: 'cover',
               }}
           />
           <Card.Content id="card-bottom" textAlign="center">
             Carpool
           </Card.Content>
         </Card>
         <Card href='http://www.thebus.org/' target='_blank'>
           <Card.Content
               style={{
                 height: '200px',
                 backgroundImage: 'url(/images/Bus.jpg)',
                 backgroundSize: 'cover',
               }}
           />
           <Card.Content id="card-bottom" textAlign="center">
             Take the Bus
           </Card.Content>
         </Card>
         <Card href='https://gobiki.org/' target='_blank'>
           <Card.Content
               style={{
                 height: '200px',
                 backgroundImage: 'url(/images/Bike.jpg)',
                 backgroundSize: 'cover',
               }}
           />
           <Card.Content id="card-bottom" textAlign="center">
             Bike or Walk
           </Card.Content>
         </Card>
         <Card href='#Dashboard'>
           <Card.Content
               style={{
                 height: '200px',
                 backgroundImage: 'url(/images/Telework.jpg)',
                 backgroundSize: 'cover',
               }}
           />
           <Card.Content id="card-bottom" textAlign="center">
             Work from Home
           </Card.Content>
         </Card>
       </Card.Group>
       </div>
     </div>
    );
  }
}

export default Community;
