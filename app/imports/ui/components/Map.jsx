import React from 'react';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';

const mapStyles = {
  height: '400px',
  width: '89.6%',
};

export class MapContainer extends React.Component {
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
  };

  onMarkerClick = (props, marker, e) => this.setState({
        selectedPlace: props,
        activeMarker: marker,
        showingInfoWindow: true,
      });

  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null,
      });
    }
  };

  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null,
      });
    }
  };

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
          <Marker onHover={this.onMarkerClick}
                  name={'Current location'}
                  position={{ lat: 21.4389, lng: -158.0001 }}
          />
          {/*<InfoWindow*/}
          {/*    marker={this.state.activeMarker}*/}
          {/*    visible={this.state.showingInfoWindow}>*/}
          {/*  <div>*/}
          {/*    <h1>Honolulu County</h1>*/}
          {/*  </div>*/}
          {/*</InfoWindow>*/}
          <Marker onClick={this.onMarkerClick}
                  name={'Current location'}
                  position={{ lat: 19.5429, lng: -155.6659 }}
          />
          <Marker onClick={this.onMarkerClick}
                  name={'Current location'}
                  position={{ lat: 20.7984, lng: -156.3319 }}
          />
          <Marker onClick={this.onMarkerClick}
                  name={'Current location'}
                  position={{ lat: 21.9661, lng: -159.5738 }}
          />
          <Marker onClick={this.onMarkerClick}
                  name={'Current location'}
                  position={{ lat: 21.1950, lng: -156.9750 }}
          />
        </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'INSERT API KEY HERE',
})(MapContainer);
