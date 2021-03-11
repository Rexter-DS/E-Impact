import React from 'react';
import { Card, Divider, Header, Popup } from 'semantic-ui-react';
import SideBar from '../components/SideBar';
import Footer from '../components/Footer';
import Map from '../components/MapContainer';

class Community extends React.Component {

  render() {
    return (
      <div>
        <div id='community-container'>
          <SideBar/>
          <div id='community-map'>
            <Map/>
          </div>
          <div id='community-bottom'>
            <Divider horizontal>
              <Header as='h3'>
                Get Involved
              </Header>
            </Divider>
            <Card.Group centered itemsPerRow={6}>
              <Popup
                  trigger={
                    <Card href='https://www.hawaiianelectric.com/products-and-services/electric-vehicles'
                          target='_blank'>
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
                    </Card>}> <Popup.Content>
                Learn more about the benefits of driving an electric vehicle
              </Popup.Content>
              </Popup>
              <Popup
                  trigger={
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
                    </Card>}> <Popup.Content>
                Ride with friends and save money
              </Popup.Content>
              </Popup>
              <Popup
                  trigger={
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
                    </Card>}> <Popup.Content>
                Learn more about public transportation in Hawaii
              </Popup.Content>
              </Popup><Popup
                trigger={
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
                  </Card>}> <Popup.Content>
              Learn more about bike sharing
            </Popup.Content>
            </Popup><Popup
                trigger={
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
                  </Card>}> <Popup.Content>
              Skip the commute and work from home
            </Popup.Content>
            </Popup>
            </Card.Group>
          </div>
        </div>
        <Footer id={'community-footer'}/>
      </div>
    );
  }
}

export default Community;
