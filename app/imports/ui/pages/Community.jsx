import React from 'react';
import { Grid, Image } from 'semantic-ui-react';
import SidebarVisible from '../components/SideBar';

class Community extends React.Component {
  render() {
    return (
     <div id='community-container'>
       <SidebarVisible/>
       <Grid>
         <Grid.Row>
           <Image src='/images/CommunityMap.png' size='big' centered bordered></Image>
         </Grid.Row>
         <Grid.Row>
           <Grid.Column textAlign='center'>ZIP: 96817</Grid.Column>
         </Grid.Row>
         <Grid.Row columns={2}>
           <Grid.Column width={8} textAlign='center'>Users in Zip</Grid.Column>
           <Grid.Column width={8} textAlign='center'>GHG for Zip</Grid.Column>
         </Grid.Row>
         <Grid.Row columns={2}>
           <Grid.Column width={8} textAlign='center'>50</Grid.Column>
           <Grid.Column width={8} textAlign='center'>354 lbs of CO2</Grid.Column>
         </Grid.Row>
         <Grid.Row style={{ padding: '40px' }}/>
         <Grid.Row columns={2}>
           <Grid.Column width={8} textAlign='center'>Total Users</Grid.Column>
           <Grid.Column width={8} textAlign='center'>GHG for O`ahu</Grid.Column>
         </Grid.Row>
         <Grid.Row columns={2}>
           <Grid.Column width={8} textAlign='center'>423</Grid.Column>
           <Grid.Column width={8} textAlign='center'>6,633 lbs of CO2</Grid.Column>
         </Grid.Row>
       </Grid>
     </div>
    );
  }
}

export default Community;
