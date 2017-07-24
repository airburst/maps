import React, { Component } from 'react';
// import MapContainer from './components/GoogleMap/Container';
import Loading from './components/Loading';
import ScriptLoader from './services/ScriptLoader';
import OsMap from './components/OSMap/OSMap';
import './App.css';

class App extends Component {

	constructor() {
		super();
		this.scriptLoader = new ScriptLoader();
		this.state = { osMapLoaded: false };
	}
	
	componentWillMount() {
		this.scriptLoader.load('http://openspace.ordnancesurvey.co.uk/osmapapi/openspace.js?key=A73F02BD5E3B3B3AE0405F0AC8602805')
			.then(() => this.setState({ osMapLoaded: true }))
			.catch(err => console.log(err));
	}

	render() {
		return (
			<div role="main" id="main">
				{!this.state.osMapLoaded ? <Loading /> : (
					<OsMap
						northing={168721}
						easting={385480}
						zoom={8} />
				)}
			</div>
		);

	}
}

export default App;

// eastings":385480,"northings":168721

/*<OsMap
					lat={51.417319}
					lon={-2.210189}
					zoom={8} />*/
