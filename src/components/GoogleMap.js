import React, { Component } from 'react';
import { GoogleApiWrapper, Map, InfoWindow, Marker } from 'google-maps-react';
import { GOOGLE_MAPS_API_KEY } from '../config';

class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: this.props.lat, 
      lng: this.props.lng,
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {}
    }
  }

  onMapClicked = (mapProps, map, clickEvent) => {
    console.log(mapProps, map, clickEvent)
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  };

  onMarkerClick = (props, marker, e) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
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

        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}>
          <div>
            <h1>{this.state.selectedPlace.name}</h1>
          </div>
        </InfoWindow>
      </Map>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: (GOOGLE_MAPS_API_KEY)
})(MapContainer)