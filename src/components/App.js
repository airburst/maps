import React, { Component } from 'react';
// import MapContainer from './GoogleMap/Container';
import Loading from './Loading';
import Header from './Header';
import OsMap from './OSMap';
import './App.css';

export default class App extends Component {

	render() {
		const { osScriptLoaded } = this.props.settings;
		return (
			<div role="main" id="main">
				<Header />
				{!osScriptLoaded ? <Loading /> : (
					<OsMap
						northing={168721}
						easting={385480}
						zoom={8}
						route={this.props.route}
						addPoint={this.props.addPoint}
						addTrack={this.props.addTrackAndGetElevation} />
				)}
			</div>
		);

	}
}

// eastings":385480,"northings":168721

/*<OsMap
					lat={51.417319}
					lon={-2.210189}
					zoom={8} />*/
