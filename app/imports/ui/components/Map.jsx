import React from 'react';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
import { Button, Icon } from 'semantic-ui-react';
import State from '../components/State';
import Kauai from '../components/Kauai';
import Maui from '../components/Maui';
import Honolulu from '../components/Honolulu';
import Hawaii from '../components/Hawaii';
import Kalawao from '../components/Kalawao';
import { NavLink } from 'react-router-dom';

const mapStyles = {
  height: '400px',
  width: '90%',
};

export class MapContainer extends React.Component {
  state = {
    showingInfoWindow: false,
    hawaiiCounty: false,
    honoluluCounty: false,
    mauiCounty: false,
    kauaiCounty: false,
    kalawaoCounty: false,
    allCounties: true,
    activeMarker: {},
    selectedPlace: {},
  };

  // onMarkerClick = (props, marker, e) => this.setState({
  //       selectedPlace: props,
  //       activeMarker: marker,
  //       showingInfoWindow: true,
  //     });

  onHonoluluClick = (props, marker) => this.setState({
    selectedPlace: props,
    activeMarker: marker,
    honoluluCounty: true,
    kalawaoCounty: false,
    kauaiCounty: false,
    mauiCounty: false,
    hawaiiCounty: false,
    allCounties: false,
  });

  onHawaiiClick = (props, marker) => this.setState({
    selectedPlace: props,
    activeMarker: marker,
    showingInfoWindow: true,
    hawaiiCounty: true,
    kalawaoCounty: false,
    kauaiCounty: false,
    honoluluCounty: false,
    mauiCounty: false,
    allCounties: false,
  });

  onMauiClick = (props, marker) => this.setState({
    selectedPlace: props,
    activeMarker: marker,
    showingInfoWindow: true,
    mauiCounty: true,
    kalawaoCounty: false,
    kauaiCounty: false,
    honoluluCounty: false,
    hawaiiCounty: false,
    allCounties: false,
  });

  onKauaiClick = (props, marker) => this.setState({
    selectedPlace: props,
    activeMarker: marker,
    showingInfoWindow: true,
    kauaiCounty: true,
    kalawaoCounty: false,
    honoluluCounty: false,
    mauiCounty: false,
    hawaiiCounty: false,
    allCounties: false,
  });

  onKalawaoClick = (props, marker) => this.setState({
    selectedPlace: props,
    activeMarker: marker,
    showingInfoWindow: true,
    kalawaoCounty: true,
    kauaiCounty: false,
    honoluluCounty: false,
    mauiCounty: false,
    hawaiiCounty: false,
    allCounties: false,
  });

  // showHonolulu = () => this.setState({
  //   showingInfoWindow: true,
  // });
  //
  // closeHonolulu = () => this.setState({
  // showingInfoWindow: false,
  //   activeMarker: null,
  // });

  // onClose = props => {
  //   if (this.state.showingInfoWindow) {
  //     this.setState({
  //       showingInfoWindow: false,
  //       activeMarker: null,
  //     });
  //   }
  // };

  render() {

    return (
        <div>
        <Map
            /* eslint-disable-next-line react/prop-types */
            google={this.props.google}
            zoom={7}
            style={mapStyles}
            initialCenter={{
              lat: 20.5,
              lng: -157.5,
            }}
        >
          {/*<Button animated>*/}
          {/*  <Button.Content visible>Take me there!</Button.Content>*/}
          {/*  <Button.Content hidden>*/}
          {/*    <Icon name='long arrow alternate right'/>*/}
          {/*  </Button.Content>*/}
          {/*</Button>*/}
          <Marker onClick={this.onHonoluluClick}
                  // onMouseEnter={this.showInfo}
                  // onMouseExit={this.closeInfo}
                  name={'Honolulu County'}
                  position={{ lat: 21.4389, lng: -158.0001 }}
          />
           {/* <InfoWindow */}
           {/*    marker={this.state.activeMarker} */}
           {/*    visible={this.state.showingInfoWindow}> */}
           {/*  <div> */}
           {/*    <h1>Honolulu County</h1> */}
           {/*  </div> */}
           {/* </InfoWindow> */}
          <Marker onClick={this.onHawaiiClick}
                  name={'Hawaii County'}
                  position={{ lat: 19.5429, lng: -155.6659 }}
          />
          <Marker onClick={this.onMauiClick}
                  name={'Maui County'}
                  position={{ lat: 20.7984, lng: -156.3319 }}
          />
          <Marker onClick={this.onKauaiClick}
                  name={'Kauai County'}
                  position={{ lat: 21.9661, lng: -159.5738 }}
          />
          <Marker onClick={this.onKalawaoClick}
                  name={'Kalawao County'}
                  position={{ lat: 21.1950, lng: -156.9750 }}
          />
        </Map>
          <div id='county-information'>
          { this.state.kauaiCounty === true ? <Kauai/> : ''}
          { this.state.honoluluCounty === true ? <Honolulu/> : ''}
          { this.state.mauiCounty === true ? <Maui/> : ''}
          { this.state.hawaiiCounty === true ? <Hawaii/> : ''}
          { this.state.kalawaoCounty === true ? <Kalawao/> : ''}
          { this.state.allCounties === true ? <State/> : ''}
          </div>
        </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyAbV-z-8r_Ez5Pv1sfjoMdGy4V600Y1yKw',
})(MapContainer);
