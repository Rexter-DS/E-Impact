import React from 'react';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
import { Button, Icon } from 'semantic-ui-react';

const mapStyles = {
  height: '400px',
  width: '90%',
};

export class MapContainer extends React.Component {
  state = {
    showingInfoWindow: false,
    showingHCA: false,
    showingSCH: false,
    activeMarker: {},
    selectedPlace: {},
  };

  onMarkerClick = (props, marker) => this.setState({
        selectedPlace: props,
        activeMarker: marker,
        showingInfoWindow: true,
      });

  onHCAClick = (props, marker) => this.setState({
    selectedPlace: props,
    activeMarker: marker,
    showingHCA: true,
  })

  onSCHClick = (props, marker) => this.setState({
    selectedPlace: props,
    activeMarker: marker,
    showingSCH: true,
  })

  onClose = () => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null,
      });
    }
  };

  /*
   * https://www.hawaiiconservation.org/
   * https://808cleanups.org/
   * https://www.sustainablecoastlineshawaii.org/
   *
   *
   */

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
          <Marker onClick={this.onHCAClick}
                  name={'Hawaii Community Alliance'}
                  position={{ lat: 21.2970, lng: -157.8146 }}
          />
          <InfoWindow
              marker={this.state.activeMarker}
              visible={this.state.showingHCA}>
            <div>
              <h1>Hawai&apos;i Conservation Alliance</h1>
            </div>
          </InfoWindow>
          <Marker onClick={this.onSCHClick}
                  name={'Sustainable Coastlines Hawaii'}
                  position={{ lat: 21.288140, lng: -157.808660 }}
          />
          <InfoWindow
              marker={this.state.activeMarker}
              visible={this.state.showingSCH}>
            <div>
              <h1>Sustainable Coastlines Hawaii</h1>
            </div>
          </InfoWindow>
        </Map>
          <div id='community-section'>

          </div>
        </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyAbV-z-8r_Ez5Pv1sfjoMdGy4V600Y1yKw',
})(MapContainer);
