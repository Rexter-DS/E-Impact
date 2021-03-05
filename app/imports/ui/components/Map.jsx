import React from 'react';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';

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
          <Marker onClick={this.onHonoluluClick}
                  // onMouseEnter={() => this.state.showingInfoWindow(true)}
                  // onMouseExit={() => this.state.showingInfoWindow(false)}
                  name={'Honolulu County'}
                  position={{ lat: 21.4389, lng: -158.0001 }}
          />
           <InfoWindow
              marker={this.state.activeMarker}
              visible={this.state.showingInfoWindow}>
            <div>
              <h1>Honolulu County</h1>
            </div>
           </InfoWindow>
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
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyAbV-z-8r_Ez5Pv1sfjoMdGy4V600Y1yKw',
})(MapContainer);
