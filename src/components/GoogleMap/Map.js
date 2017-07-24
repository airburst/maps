import React, { Component } from 'react';
import linkRef from 'linkref';

export class Map extends Component {

    constructor(props) {
        super(props);
        const { lat, lng } = this.props.initialCenter || { lat: 51.309490, lng: -2.217110 };
        this.state = {
            currentLocation: {
                lat: lat,
                lng: lng
            }
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.google !== this.props.google) {
            this.loadMap();
        }
        // React to changes in route
        if (prevProps.path !== this.props.path) {
            this.loadMap();
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.path !== this.props.path;
    }

    recenterMap(position) {
        const map = this.map;
        const google = this.props.google;
        const maps = google.maps;
        if (map) {
            let center = new maps.LatLng(position.lat, position.lng)
            map.panTo(center)
        }
    }

    componentDidMount() {
        this.loadMap();
    }

    loadMap() {
        if (this.props && this.props.google) {
            const { google } = this.props;
            const maps = google.maps;
            let { zoom } = this.props;
            const { lat, lng } = this.state.currentLocation;
            const center = new maps.LatLng(lat, lng);
            const mapConfig = Object.assign({}, {
                center: center,
                zoom: zoom,
                zoomControlOptions: {
                    position: maps.ControlPosition.RIGHT_TOP
                }
            })
            this.map = new maps.Map(this.refs.map, mapConfig);

            // this.scaleMap();
            // this.drawPath();
        }
    }

    scaleMap() {
        const bounds = new this.props.google.maps.LatLngBounds();
        this.props.path.forEach((c) => { this.scaleToFitNewMarker(bounds, c); });
    }

    scaleToFitNewMarker(bounds, marker) {
        const maps = this.props.google.maps;
        bounds.extend(new maps.LatLng(marker.lat, marker.lng));
        // Don't zoom too close if only one marker
        if (bounds.getNorthEast().equals(bounds.getSouthWest())) {
            var extendPoint1 = new maps.LatLng(bounds.getNorthEast().lat() + 0.005, bounds.getNorthEast().lng() + 0.005);
            var extendPoint2 = new maps.LatLng(bounds.getNorthEast().lat() - 0.005, bounds.getNorthEast().lng() - 0.005);
            bounds.extend(extendPoint1);
            bounds.extend(extendPoint2);
        }
        this.map.fitBounds(bounds);
    }

    drawPath() {
        const route = new this.props.google.maps.Polyline({
            path: this.props.path,
            geodesic: true,
            strokeColor: '#C8042B',
            strokeOpacity: 0.9,
            strokeWeight: 3
        });

        route.setMap(this.map);
        if (this.props.path.length > 0) { this.drawMarkers(this.props.path[0]); }
    }

    // drawMarkers(pos) {
    //     let position = new this.props.google.maps.LatLng(pos.lat, pos.lng);
    //     let marker = new this.props.google.maps.Marker({
    //         position: position,
    //         map: this.map,
    //         title: 'Start'
    //     });
    // }

    render() {
        return (
            <div
                ref={linkRef(this, 'map')}
                id="map" >
                Loading map...
                {this.renderChildren()}
            </div>
        );
    }

    renderChildren() {
        const { children } = this.props;
        if (!children) return;

        return React.Children.map(children, c => {
            return React.cloneElement(c, {
                map: this.map,
                google: this.props.google,
                mapCenter: this.state.currentLocation
            });
        })
    }

};

export default Map;