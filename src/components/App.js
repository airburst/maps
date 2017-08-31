import React, { Component } from 'react';
// import MapContainer from './GoogleMap/Container';
import Loading from './Loading';
import Header from './Header';
import OsMap from './OSMap';
import ElevationProfile from '../containers/ElevationProfile';
import './App.css';

export default class App extends Component {

	handleSave = () => {
		const { name, waypoints, track, elevation } = this.props.route;
		console.log(JSON.stringify({ name, waypoints, track, elevation }));
	}

	render() {
		const { osScriptLoaded } = this.props.settings;
		const { coords, zoom } = this.props.settings;
		const hasTrack = this.props.route.track.length > 0;
		return (
			<div role="main" id="main">
				<Header
					auth={this.props.auth}
					hasTrack={hasTrack}
					followsRoads={this.props.route.followsRoads}
					toggleFollowsRoads={this.props.toggleFollowsRoads}
					removePoint={this.props.removePoint}
					clearRoute={this.props.clearRoute}
					export={this.props.exportRoute}
					import={this.props.importRoute}
					save={this.handleSave}
					importModalShown={this.props.settings.showImportModal}
					showImportModal={this.props.showImportModal}
					hideImportModal={this.props.hideImportModal} />

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
