import React, { Component } from 'react';
// import MapContainer from './GoogleMap/Container';
import Loading from './Loading';
import Header from './Header';
import OsMap from './OSMap';
import ElevationProfile from '../containers/ElevationProfile';
import './App.css';

export default class App extends Component {

	render() {
console.log(this.props);
		const { osScriptLoaded } = this.props.settings;
		const { coords, zoom } = this.props.settings;
		const hasTrack = this.props.route.waypoints.length > 0;
		return (
			<div role="main" id="main">
				<Header
					auth={this.props.auth}
					hasTrack={hasTrack}
					followsRoads={this.props.route.followsRoads}
					toggleFollowsRoads={this.props.toggleFollowsRoads}
					removePoint={this.props.removePoint}
					clearRoute={this.props.clearRoute}
					export={this.props.exportRoute} />

				{!osScriptLoaded ? <Loading /> : (
					<OsMap
						coords={coords}
						zoom={zoom}
						route={this.props.route}
						addPoint={this.props.addPoint}
						addTrack={this.props.addTrackAndGetElevation}
						followsRoads={this.props.route.followsRoads} />
				)}
				<ElevationProfile />
			</div>
		);

	}
}


// importFile(ev) {
// 	if (this.fileService.supports(ev.target)) {
// 		this.fileService.readTextFile(ev.target, (...data) => {
// 			this.gpxService.read(data);
// 			this.osmap.centreAndSetMapEvents();
// 			this.osmap.removeMapEvents();
// 			ev.target.value = null;  // Empty the file input so that it can detect changes
// 			this.makeRouteNonEditable();
// 		});
// 	}
// }

// exportFile() {
// 	let name = this.store.getState().details.name + '.gpx',
// 		gpx = this.gpxService.write();
// 	this.fileService.save(gpx, name);
// }
