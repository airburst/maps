import React, { Component } from 'react';
import Loading from '../Loading';
import OsMap from '../OSMap';
import ElevationProfile from '../ElevationProfile';
// import MapContainer from './GoogleMap/Container';
import './Embed.css';

export default class Embed extends Component {

    componentDidMount() {
        const { match, getEmbedRoute } = this.props;
        getEmbedRoute(match.params.id);
    }

    render() {
        const { settings, route } = this.props;
        const { osScriptLoaded, coords, zoom } = settings;
        
        return (
            <div role="main" id="main">
                {!osScriptLoaded ? <Loading /> : (
                    <OsMap
                        coords={coords}
                        zoom={zoom}
                        route={route} />
                )}

                <ElevationProfile />
            </div>
        );
    }
}
				