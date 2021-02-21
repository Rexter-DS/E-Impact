import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

const MapTest = ({ text }) => <div>{text}</div>;

class SimpleMap extends Component {
  static defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33,
    },
    zoom: 11,
  };

  render() {
    return (
        // Important! Always set the container height explicitly
        <div style={{ height: '50vh', width: '50%' }}>
          <GoogleMapReact
              bootstrapURLKeys={{ key: 'API KEY HERE' }}
              defaultCenter={this.props.center}
              defaultZoom={this.props.zoom}
          >
            <MapTest
                lat={21.3069}
                lng={157.8583}
            />
          </GoogleMapReact>
        </div>
    );
  }
}

export default SimpleMap;
