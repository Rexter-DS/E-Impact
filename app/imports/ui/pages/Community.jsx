import React from 'react';
import { Divider, Header, Card } from 'semantic-ui-react';
import SidebarVisible from '../components/SideBar';
import Map from '../components/Map';
import County from '../components/County';

class Community extends React.Component {
  render() {
    return (
     <div id='community-container'>
       <SidebarVisible/>
       <div id='community-map'>
        <Map/>
       </div>
       <div id='community-bottom'>
       <County/>
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
