import React from 'react';
import { Image, Grid } from 'semantic-ui-react';
import CommunityNavBar from '../components/CommunityNavBar';
import Footer from '../components/Footer';
import PublicMap from '../components/PublicMap';

class PublicCommunity extends React.Component {

  render() {
    return (
        <div>
          <CommunityNavBar/>
          <div id='public-community-container'>
            <div id='community-map'>
              <PublicMap/>
            </div>
            <div id='public-community-bottom'>
              <h1 id='community-engagement' align='center'>Get involved with the community</h1>
              <Grid>
                <Grid.Column width={3}>
                  <Image size='medium' src="/organizations/SCHLogo.png"/>
                  Conserving Hawaii&apos;s lands and waters. Hosts community cleanups and assists others host their own cleanups.
                </Grid.Column>
                <Grid.Column width={3}>
                  <Image size='medium' src="/organizations/SCHLogo.png"/>
                  Conserving Hawaii&apos;s lands and waters. Hosts community cleanups and assists others host their own cleanups.
                </Grid.Column>
              </Grid>
            </div>
          </div>
          <Footer id={'community-footer'}/>
        </div>
    );
  }
}

export default PublicCommunity;
