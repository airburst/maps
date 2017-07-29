import React, { Component } from 'react';
// import MapContainer from './GoogleMap/Container';
import Loading from './Loading';
import Header from './Header';
import OsMap from './OSMap';
import './App.css';

// const oneSearchResult = ({ type, loc }) => {
// 	if (!loc) { return false; }
// 	const { lat, lon } = loc;
// 	return (lat !== undefined )|| (loc.length && loc.length === 1);
// }

// const getLatLon = ({ loc }) => {
// 	let { lat, lon } = loc;
// 	if (lat === undefined) { 
// 		let { lat, lon } = loc[0].location;
// 	};
// 	return { lat, lon };
// }

export default class App extends Component {

	render() {
		const { osScriptLoaded } = this.props.settings;
		const hasTrack = this.props.route.waypoints.length > 0;
		const { coords, zoom } = this.props.settings;
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
						coords={coords}
						zoom={zoom}
						route={this.props.route}
						addPoint={this.props.addPoint}
						addTrack={this.props.addTrackAndGetElevation}
						followsRoads={this.props.route.followsRoads}
						searchResults={this.props.search.searchResults} />
				)}
			</div>
		);

	}
}
