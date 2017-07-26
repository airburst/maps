import React, { Component } from 'react';
// import MapContainer from './GoogleMap/Container';
import Loading from './Loading';
import Header from './Header';
import OsMap from './OSMap';
import './App.css';

export default class App extends Component {

	render() {
		const { osScriptLoaded } = this.props.settings;
		const hasTrack = this.props.route.waypoints.length > 0;
		return (
			<div role="main" id="main">
				<Header
					hasTrack={hasTrack}
					followsRoads={this.props.route.followsRoads}
					toggleFollowsRoads={this.props.toggleFollowsRoads}
					removePoint={this.props.removePoint}
					clearRoute={this.props.clearRoute} />
				{!osScriptLoaded ? <Loading /> : (
					<OsMap
						northing={168721}
						easting={385480}
						zoom={7}
						route={this.props.route}
						addPoint={this.props.addPoint}
						addTrack={this.props.addTrackAndGetElevation}
						followsRoads={this.props.route.followsRoads} />
				)}
			</div>
		);

	}
}

/*<OsMap
	lat={51.417319}
	lon={-2.210189}
	zoom={8} />*/
