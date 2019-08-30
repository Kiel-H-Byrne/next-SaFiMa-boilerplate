import React, { Component } from 'react';
import { GoogleMap, LoadScript, MarkerClusterer,InfoWindow } from '@react-google-maps/api'
import { connect } from "react-redux";
import {formatDistance} from "date-fns"

import { GEOCENTER, isHome } from "../../../client/functions";
import * as ACTIONS from "../../../client/actions/actionConstants";

import MyMarker from './myMarker'
import CenterButton from './CenterButton'

const clusterStyles= [
  {
    url: './static/images/m1.png',
    height: 53,
    width: 53,
    anchor: [26, 26],
    textColor: '#000',
    textSize: 11
  }, {
    url: './static/images/m2.png',
    height: 56,
    width: 56,
    anchor: [28, 28],
    textColor: '#000',
    textSize: 11
  }, {
    url: './static/images/m3.png',
    height: 66,
    width: 66,
    anchor: [33, 33],
    textColor: '#000',
    textSize: 11
  }, {
    url: './static/images/m4.png',
    height: 78,
    width: 78,
    anchor: [39, 39],
    textColor: '#000',
    textSize: 11
  }, {
    url: './static/images/m5.png',
    height: 90,
    width: 90,
    anchor: [45, 45],
    textColor: '#000',
    textSize: 11
  }
]

const homeClusterStyles = [
  {
    url: './static/images/hm1.png',
    height: 53,
    width: 53,
    anchor: [26, 26],
    textColor: '#000',
    textSize: 11
  }, {
    url: './static/images/hm2.png',
    height: 56,
    width: 56,
    anchor: [28, 28],
    textColor: '#000',
    textSize: 11
  }, {
    url: './static/images/hm3.png',
    height: 66,
    width: 66,
    anchor: [33, 33],
    textColor: '#000',
    textSize: 11
  }, {
    url: './static/images/hm4.png',
    height: 78,
    width: 78,
    anchor: [39, 39],
    textColor: '#000',
    textSize: 11
  }, {
    url: './static/images/hm5.png',
    height: 90,
    width: 90,
    anchor: [45, 45],
    textColor: '#000',
    textSize: 11
  }];

const StationWindow = (props) => {
  let { data, position } = props;
  let loc = position.split(',');
  let locObj = {lat: parseFloat(loc[0]), lng: parseFloat(loc[1])}

  return ( 
    <InfoWindow
      position={locObj}
      options={{
        pixelOffset: {height:-30,width:0},
      }}
      className="App-infowindow"
      >
      <div >
        <h3>{data.hostname}</h3>
        <p><strong>{isHome(data.ip_local) ? data.region : data.ip_public} </strong><br />
        Last Connection: {formatDistance(new Date(data._changed), new Date())}</p>
      </div>
    </InfoWindow>
  )
}

const libraries = ["visualization"];

class AppMap extends Component {
  constructor(props) {
    super(props)
    this.state = {
      map: null
    }
  }
  static defaultProps = {
    center: GEOCENTER,
    zoom: 5,
    options: {
      clickableIcons: false,
      disableDefaultUI: false,
      fullscreenControl: true,  
      mapTypeControl: false,
      scaleControl: false,
      rotateControl: true,
      streetViewControl: true,
      gestureHandling: "greedy",
      scrollwheel: true,
      maxZoom: 14,
      minZoom: 3,
      // Map styles; snippets from 'Snazzy Maps'.
      styles: [
          {
              "featureType": "water",
              "elementType": "geometry",
              "stylers": [
                  {
                      "color": "#000000"
                  },
                  {
                      "lightness": 17
                  }
              ]
          },
          {
              "featureType": "landscape.natural",
              "elementType": "geometry",
              "stylers": [
                  {
                      "color": "#000000"
                  },
                  {
                      "lightness": 30
                  }
              ]
          },
          {
              "featureType": "landscape.man_made",
              "elementType": "geometry",
              "stylers": [
                  {
                      "color": "#000"
                  },
                  {
                      "lightness": 10
                  }
              ]
          },{
              "featureType": "road.highway",
              "elementType": "geometry.fill",
              "stylers": [
                  {
                      "color": "#000000"
                  },
                  {
                      "lightness": 17
                  }
              ]
          },
          {
              "featureType": "road.highway",
              "elementType": "geometry.stroke",
              "stylers": [
                  {
                      "color": "#000000"
                  },
                  {
                      "lightness": 29
                  },
                  {
                      "weight": 0.2
                  }
              ]
          },
          {
              "featureType": "road.arterial",
              "elementType": "geometry",
              "stylers": [
                  {
                      "color": "#000000"
                  },
                  {
                      "lightness": 18
                  }
              ]
          },
          {
              "featureType": "road.local",
              "elementType": "geometry",
              "stylers": [
                  {
                      "color": "#000000"
                  },
                  {
                      "lightness": 16
                  }
              ]
          },
          {
              "featureType": "poi",
              "elementType": "geometry",
              "stylers": [
                  {
                      "color": "#fff"
                  },
                  {
                      "lightness": 21
                  }
              ]
          },
          {
              "elementType": "labels.text.stroke",
              "stylers": [
                  {
                      "visibility": "on"
                  },
                  {
                      "color": "#000000"
                  },
                  {
                      "lightness": 25
                  }
              ]
          },
          {
              "elementType": "labels.text.fill",
              "stylers": [
                  {
                      "saturation": 36
                  },
                  {
                      "color": "#000000"
                  },
                  {
                      "lightness": 50
                  }
              ]
          },
          {
              "elementType": "labels.icon",
              "stylers": [
                  {
                      "visibility": "off"
                  }
              ]
          },
          {
              "featureType": "transit",
              "elementType": "geometry",
              "stylers": [
                  {
                      "color": "#000000"
                  },
                  {
                      "lightness": 19
                  }
              ]
          },
          {
              "featureType": "administrative",
              "elementType": "geometry.fill",
              "stylers": [
                  {
                      "color": "#000000"
                  },
                  {
                      "lightness": 20
                  }
              ]
          },
          {
              "featureType": "administrative",
              "elementType": "geometry.stroke",
              "stylers": [
                  {
                      "color": "#000000"
                  },
                  {
                      "lightness": 17
                  },
                  {
                      "weight": 1.2
                  }
              ]
          }]
    }
  };
  
  handleMouseOverCluster = (cluster) => {
    this.setState({
      showInfoWindows: true
    })
  }

  render() {
    let { center, zoom, options } = this.props
    let { mapLoaded, markerData, data, browserLoc } = this.props;
    //Render What? A HOC that loads the google-maps-sdk, the Map container and all components within it. 
    //Render Map
    //Render WAN Markers (cluster, but change colors...)
    //Render LAN Markers (Cluster)
    //Render Info Window(s)
    let lanData = Object.values(data).filter(x => isHome(x.ip_local));
    let wanData = Object.values(data).filter(x => !isHome(x.ip_local))

    // let locArray = wanData.map(x => {
    //   let locObjs = {"lat": parseFloat(x.location.split(",")[0]), "lng": parseFloat(x.location.split(",")[1]) }
    //   return locObjs
    //   } )
      // const { handleMouseOverCluster} = this;
    return (
      // Important! Always set the container height explicitly
      //set via app-map classname

      <LoadScript
      id="script-loader"
      googleMapsApiKey="AIzaSyAPl9V4veg6kLNlB-kUJLu4ikzJVd6pP54"
      language="en"
      region="us" 
      libraries={libraries} 
      >
        <GoogleMap
          onLoad={map => {
            // const bounds = new window.google.maps.LatLngBounds();
            this.setState({map: map})
            mapLoaded(map)
          }}
          mapContainerClassName="App-map"
          center={browserLoc || center}
          zoom={zoom}
          options={options}
          >
          <MarkerClusterer 
          styles={homeClusterStyles}
          // onClick={(event) =>{console.log(event.getMarkers())}}
          minimumClusterSize = {3}
          >
            { (clusterer) => lanData.map( z => <MyMarker key={z._id} data={z} clusterer={clusterer} />) } 
          </MarkerClusterer> 

          <MarkerClusterer 
          styles={clusterStyles}
          // onClick={(event) =>{console.log(event.getMarkers())}}
          minimumClusterSize = {15}
          >
            { (clusterer) => wanData.map( z => <MyMarker key={z._id} data={z} clusterer={clusterer} /> ) } 
          </MarkerClusterer> 
          { markerData && (<StationWindow position={markerData.location} data={markerData}/>) }
          <CenterButton />
          {/* <HeatmapLayer map={this.state.map && this.state.map} data={data.map(x => {x.location})} /> */}
        </GoogleMap>
      </LoadScript>

    );
  }
}
//Redux
function mapStateToProps(state) {
  return {
    state,
    markerData: state.map.showInfoWindow
  };
}
function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    mapLoaded: (map) => dispatch({ type: ACTIONS.MAP_LOADED, payload: map }),
    getInfoWindow: (data) => dispatch({ type: ACTIONS.SHOW_INFOWINDOW, payload: data }),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppMap);
