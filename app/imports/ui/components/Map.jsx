import React from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';

const mapStyles = {
  height: '400px',
  width: '89.6%',
};

export class MapContainer extends React.Component {
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
        </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'API KEY HERE',
})(MapContainer);
