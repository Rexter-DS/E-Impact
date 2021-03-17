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
                <Grid.Column className='organizations' width={4}>
                  <Image size='medium' src="/organizations/sustainable-coastlines.png"/>
                  <a href='https://www.sustainablecoastlineshawaii.org/' target='_blank'>Sustainable Coastlines Hawaii</a>
                  <p>
                  Conserving Hawaii&apos;s lands and waters. Hosts community cleanups and assists others host their own cleanups.
                  </p>
                </Grid.Column>
                <Grid.Column className='organizations' width={4}>
                  <Image size='medium' src="/organizations/hawaii-conservation-alliance.png"/>
                  <a href='https://www.hawaiiconservation.org/' target='_blank'>Hawaii Conservation Alliance</a>
                  <p>
                  Conserving Hawaii&apos;s lands and waters. Hosts community cleanups and assists others host their own cleanups.
                  </p>
                </Grid.Column>
                <Grid.Column className='organizations' width={4}>
                  <Image size='medium' src="/organizations/808cleanups.png"/>
                  <a href='https://808cleanups.org/' target='_blank'>808 Cleanups</a>
                  <p>
                    Conserving Hawaii&apos;s lands and waters. Hosts community cleanups and assists others host their own cleanups.
                  </p>
                </Grid.Column>
                <Grid.Column className='organizations' width={4}>
                  <Image size='medium' src="/organizations/hawaii-wildlife-fund.png"/>
                  <a href='https://www.wildhawaii.org/' target='_blank'>Hawaii Wildlife Fund</a>
                  <p>
                    Conserving Hawaii&apos;s lands and waters. Hosts community cleanups and assists others host their own cleanups.
                  </p>
                </Grid.Column>
              </Grid>
              <Grid>
                <Grid.Column className='organizations' width={4}>
                  <Image size='medium' src="/organizations/sierra-club.png"/>
                  <a href='https://sierraclubhig.org/' target='_blank'>Sierra Club Hawaii</a>
                  <p>
                    Conserving Hawaii&apos;s lands and waters. Hosts community cleanups and assists others host their own cleanups.
                  </p>
                </Grid.Column>
                <Grid.Column className='organizations' width={4}>
                  <Image size='medium' src="/organizations/marine-resource-council.png"/>
                  <a href='https://www.mauireefs.org/' target='_blank'>Marine Resource Council</a>
                  <p>
                    Conserving Hawaii&apos;s lands and waters. Hosts community cleanups and assists others host their own cleanups.
                  </p>
                </Grid.Column>
                <Grid.Column className='organizations' width={4}>
                  <Image size='medium' src="/organizations/waiwai-ola.png"/>
                  <a href='https://waterkeepershi.org/' target='_blank'>Waiwai Ola Waterkeepers Hawaii</a>
                  <p>
                    Conserving Hawaii&apos;s lands and waters. Hosts community cleanups and assists others host their own cleanups.
                  </p>
                </Grid.Column>
                <Grid.Column className='organizations' width={4}>
                  <Image size='medium' src="/organizations/kokee-resource.png"/>
                  <a href='https://www.krcp.org/' target='_blank'>Kōkeʻe Resource Conservation Program</a>
                  <p>
                    Conserving Hawaii&apos;s lands and waters. Hosts community cleanups and assists others host their own cleanups.
                  </p>
                </Grid.Column>
              </Grid>
              <Grid>
                <Grid.Column className='organizations' width={4}>
                  <Image size='medium' src="/organizations/kisc.png"/>
                  <a href='https://www.kauaiisc.org/' target='_blank'>Kauaʻi Invasive Species Committee</a>
                  <p>
                    Conserving Hawaii&apos;s lands and waters. Hosts community cleanups and assists others host their own cleanups.
                  </p>
                </Grid.Column>
                <Grid.Column className='organizations' width={4}>
                  <Image size='medium' src="/organizations/ka-honua-momona.png"/>
                  <a href='https://kahonuamomona.org/' target='_blank'>Ka Honua Momona</a>
                  <p>
                    Conserving Hawaii&apos;s lands and waters. Hosts community cleanups and assists others host their own cleanups.
                  </p>
                </Grid.Column>
                <Grid.Column className='organizations' width={4}>
                  <Image size='medium' src="/organizations/lanai-culture.png"/>
                  <a href='https://lanaichc.org/' target='_blank'>Lāna‘i Culture & Heritage Center</a>
                  <p>
                    Conserving Hawaii&apos;s lands and waters. Hosts community cleanups and assists others host their own cleanups.
                  </p>
                </Grid.Column>
                <Grid.Column className='organizations' width={4}>
                  <Image size='medium' src="/organizations/ke-ao-halii.png"/>
                  <a href='https://savehanacoast.org/' target='_blank'>Ke Ao Hali‘i</a>
                  <p>
                    Conserving Hawaii&apos;s lands and waters. Hosts community cleanups and assists others host their own cleanups.
                  </p>
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
