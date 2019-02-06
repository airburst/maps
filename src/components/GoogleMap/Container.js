//import ReactDOM from 'react-dom';
import linkRef from 'linkref';
import React, { Component } from 'react';
import GoogleApiComponent from './GoogleApiComponent';
import Map from './Map';

class MapContainer extends Component {
  render() {
    if (!this.props.loaded) {
      return <div>Loading...</div>;
    }

    return (
      <div ref={linkRef(this, 'container')} id="map-container">
        <Map google={this.props.google} zoom={15} />
      </div>
    );
  }
}

export default GoogleApiComponent({
  apiKey: 'AIzaSyDGe_FmSZBr74_Eo9rbe-Ld9r264Ay47hE',
  libraries: ['geometry']
})(MapContainer);
