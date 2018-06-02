import React, { Component } from 'react';
import { GoogleApiWrapper, Map, Marker } from 'google-maps-react';
import { GOOGLE_MAPS_API_KEY } from '../config';

class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: this.props.lat, 
      lng: this.props.lng
    }
  }

  onMapClicked = (mapProps, map, clickEvent) => {
    console.log(mapProps, map, clickEvent)
  };

  onMarkerClick = (props, marker, e) => {
    console.log(props, marker, e)
  }

  renderMarker() {
    return (
      <Marker
        onClick={this.onMarkerClick}
        title={this.props.name}
        name={this.props.name}
        position={{ lat: this.state.lat, lng: this.state.lng }} />
    )
  }

  // this.setState({ lat: , lng:  })

  render() {
    const style = {
      width: '80%',
      height: '300px'
    }
    return (
      <Map google={this.props.google}
        onClick={this.onMapClicked}
        style={style}
        initialCenter={{ lat: this.props.lat, lng: this.props.lng }}>

        {this.renderMarker()}
      </Map>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: (GOOGLE_MAPS_API_KEY)
})(MapContainer)