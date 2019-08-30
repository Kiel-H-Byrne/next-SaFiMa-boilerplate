import React, { Component } from 'react';
import { connect } from "react-redux";

import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import MyLocationIcon from '@material-ui/icons/MyLocation';

import * as ACTIONS from "../../../client/actions/actionConstants";
import {GEOCENTER, panToMarker} from "../../../client/functions";

class CenterButton extends Component {
	render() {
		const { GMap } = this.props.state.map;
		
		return (
			<Tooltip title="Zoom Out" aria-label="Zoom Out">
			<div className="App-Centerbutton">
				<Fab 
				tabIndex="2" 
				aria-label="Locate"
				style={{backgroundColor:"rgba(55, 186, 214, 1)"}}
				size="medium"
				onClick={() => {
					//if browser position; pan and zoom out
					if (navigator && navigator.geolocation) {
						navigator.geolocation.getCurrentPosition((pos) => {
							const coords = pos.coords;
							this.props.setBrowserLocation({
								lat: coords.latitude,
								lng: coords.longitude
							});

							panToMarker(GMap, {
								lat: coords.latitude,
								lng: coords.longitude
							});
							GMap.setZoom(5);
							// console.log(GMap, coords)
						})
					}
					//else pan to default center & zoom out
					// panToMarker(GMap, {GEOCENTER);
					GMap.setCenter(GEOCENTER)
					GMap.setZoom(5)
					}}>
					<MyLocationIcon />
				</Fab>
			</div>
		  </Tooltip>
		);
	}
}

const mapStateToProps = state => ({
	state,
	browserLoc: state.map.browserLoc
});

const mapDispatchToProps = dispatch => ({
	dispatch,
	setBrowserLocation: (loc) => dispatch({type:ACTIONS.SET_BROWSER_LOCATION, payload: loc}) 
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CenterButton);
