import React from 'react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Card, Divider, Header, Loader, Popup } from 'semantic-ui-react';
import SideBar from '../components/SideBar';
import Footer from '../components/Footer';
import Map from '../components/Map';
import { Users } from '../../api/user/UserCollection';

const Community = (props) => {

  if (props.userReady) {
    if (props.userProfile.theme === 'dark') {
      document.body.classList.add('dark');
    }
  }

  return (!props.userReady) ? <Loader active>Loading data</Loader> :
      (
          <div>
            <div id='community-container'>
              <SideBar theme={props.userProfile.theme}/>
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
};

Community.propTypes = {
  username: PropTypes.string,
  userReady: PropTypes.bool.isRequired,
  userProfile: PropTypes.object,
};

export default withTracker(() => {
  const username = Meteor.user()?.username;
  const userSubscribe = Users.subscribeUser();
  const userProfile = Users.getUserProfile(username);
  return {
    userReady: userSubscribe.ready(),
    username,
    userProfile,
  };
})(Community);
