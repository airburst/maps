import React, { Component } from 'react';
import Loading from './Loading';
import OsMap from '../OSMap';
// import MapContainer from './GoogleMap/Container';
import '../App.css';

export default class RouteList extends Component {

    render() {
        const { settings, route, addPoint, addTrackAndGetElevation } = this.props;
        const { osScriptLoaded, coords, zoom } = settings;
        
        return (
            <div>
                {!osScriptLoaded ? <Loading /> : (
                    <OsMap
                        coords={coords}
                        zoom={zoom}
                        route={route}
                        addPoint={addPoint}
                        addTrack={addTrackAndGetElevation}
                        followsRoads={route.followsRoads} />
                )}
            </div>
        );
    }
}
