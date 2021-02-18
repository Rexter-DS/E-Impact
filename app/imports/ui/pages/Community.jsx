import React from 'react';
import { Grid, Image, Statistic, Icon, Progress, Divider, Header, Card } from 'semantic-ui-react';
import SidebarVisible from '../components/SideBar';

class Community extends React.Component {
  render() {
    return (
     <div id='community-container'>
       <SidebarVisible/>
       <Grid>
         <Grid.Row>
           <Image src='/images/Honolulu.png' size='big' centered/>
         </Grid.Row>
         <Grid.Row>
           <Grid.Column as="h2" textAlign='center'>Honolulu County</Grid.Column>
         </Grid.Row>
         <Grid.Row centered>
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
         <Grid.Row centered>
           <Grid.Column width={5}>    <Statistic>
             <Statistic.Value><Icon name='fire'/>200</Statistic.Value>
             <Statistic.Label>gallons of gas saved</Statistic.Label>
           </Statistic>
           </Grid.Column>
           <Grid.Column width={5}>
             <Progress value='200' total='1000' progress='percent' label="2021 GOAL: 1,000 GALLONS OF GAS SAVED" color="blue"/></Grid.Column>
         </Grid.Row>
         <Grid.Row centered>
           <Grid.Column width={5}>    <Statistic>
             <Statistic.Value><Icon name='cloud'/>3,000</Statistic.Value>
             <Statistic.Label>pounds of CO2 reduced</Statistic.Label>
           </Statistic>
           </Grid.Column>
           <Grid.Column width={5}>
             <Progress value='3000' total='10000' progress='percent' label="2021 GOAL: 10,000 POUNDS OF CO2 REDUCED" color="blue"/></Grid.Column>
         </Grid.Row>
         <Grid.Row centered>
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
         <Card href='https://www.hawaiianelectric.com/products-and-services/electric-vehicles'>
           <Card.Content
               style={{
                 height: '200px',
                 backgroundImage: 'url(/images/EV.jpeg)',
                 backgroundSize: 'cover',
               }}
           />
           <Card.Content textAlign="center">
             Switch to EV or Hybrid
           </Card.Content>
         </Card>
         <Card href='http://hidot.hawaii.gov/highways/rideshare/match/'>
           <Card.Content
               style={{
                 height: '200px',
                 backgroundImage: 'url(/images/Carpool.jpg)',
                 backgroundSize: 'cover',
               }}
           />
           <Card.Content textAlign="center">
             Carpool
           </Card.Content>
         </Card>
         <Card href='http://www.thebus.org/'>
           <Card.Content
               style={{
                 height: '200px',
                 backgroundImage: 'url(/images/Bus.jpg)',
                 backgroundSize: 'cover',
               }}
           />
           <Card.Content textAlign="center">
             Take the Bus
           </Card.Content>
         </Card>
         <Card href='https://gobiki.org/'>
           <Card.Content
               style={{
                 height: '200px',
                 backgroundImage: 'url(/images/Bike.jpg)',
                 backgroundSize: 'cover',
               }}
           />
           <Card.Content textAlign="center">
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
           <Card.Content textAlign="center">
             Work from Home
           </Card.Content>
         </Card>
       </Card.Group>
     </div>
    );
  }
}

export default Community;
