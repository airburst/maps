import React, { Component } from 'react';
// import {DirectionsService} from '../google/directions.service';
// import {ADD_SEGMENT, UPDATE_SEGMENT, REMOVE_LAST_SEGMENT, CLEAR_TRACK} from '../reducers/track';
// import {UPDATE_DETAILS} from '../reducers/details';

export const flatten = array => [].concat.apply([], array);

export default class OsMap extends Component {

    constructor(props) {
        super(props);
        this.osMap = {};
        this.state = { isMoving: false };
    }

    init = () => {
        if (this.osMap.id !== undefined) {
            this.osMap.destroy();
        }
        this.ol = window.OpenLayers;
        this.os = window.OpenSpace;

        // Instantiate the map canvas
        let options = {
            controls: [
                new this.ol.Control.Navigation(),
                new this.ol.Control.TouchNavigation({
                    dragPanOptions: { enableKinetic: true }
                }),
                new this.ol.Control.KeyboardDefaults(),
                new this.os.Control.CopyrightCollection(),
                new this.ol.Control.ArgParser()
            ]
        };
        this.osMap = new this.os.Map('map-container', options);
        this.gridProjection = new this.os.GridProjection();

        // Initialise the vector layers
        this.lineVectorLayer = new this.ol.Layer.Vector('Line Vector Layer');
        this.osMap.addLayer(this.lineVectorLayer);
        this.pointVectorLayer = new this.ol.Layer.Vector('Point Vector Layer');
        this.osMap.addLayer(this.pointVectorLayer);
        this.markerVectorLayer = new this.ol.Layer.Vector('Point Vector Layer');
        this.osMap.addLayer(this.markerVectorLayer);
        this.spotVectorLayer = new this.ol.Layer.Vector('Point Vector Layer');
        this.osMap.addLayer(this.spotVectorLayer);

        // Add controls
        let position = new this.os.Control.ControlPosition(
            this.os.Control.ControlAnchor.ANCHOR_TOP_LEFT,
            new this.ol.Size(0, 100)
        );
        this.osMap.addControl(
            new this.os.Control.LargeMapControl(),
            position
        );

        this.centreAndSetMapEvents();

        this.draw();

        // Route subscriptions
        // this.route.track$.subscribe((v) => {
        //     this.draw(v);
        //     this.updateDistance(v);
        // });

        // this.route.details$.subscribe((v) => {
        //     this.setSpot(v.selectedPointIndex);
        // });
    };

    centreAndSetMapEvents = () => {
        let { lat, lon, zoom, northing, easting } = this.props;
        this.centreMap({ lat, lon, zoom, northing, easting });
        let evt = this.osMap.events;
        evt.remove('dblclick');
        evt.register('touchmove', this.osMap, () => {
            this.setState({ isMoving: true });
        });
        evt.register('touchend', this.osMap, this.touchPoint);
        evt.register('click', this.osMap, this.clickPoint);
    }

    removeMapEvents = () => {
        let evt = this.osMap.events;
        evt.remove('touchmove');
        evt.remove('touchend');
        evt.remove('click');
    }

    touchPoint = (e) => {
        if (this.state.isMoving) {
            this.setState({ isMoving: false });
            return;
        }
        const p = {
            x: e.changedTouches[0].clientX,
            y: e.changedTouches[0].clientY
        };
        const pt = this.osMap.getLonLatFromViewPortPx(p);
        this.addWayPointToMap(e, pt);
    };

    clickPoint = (e) => {
        if (!this.state.isMoving) {
            var pt = this.osMap.getLonLatFromViewPortPx(e.xy);
            this.addWayPointToMap(e, pt);
        }
    };

    addWayPointToMap = (e, pt) => {
        const p = this.convertToLatLng(pt);
        const { waypoints, followsRoads } = this.props.route;
        const lastWaypoint = waypoints.slice(-1);
        this.props.addPoint(p);
        if (waypoints.length > 0) {
            this.props.addTrack([...lastWaypoint, p]);
        }

        // if (track.length > 1) {
        //     let fp = track[track.length - 2].waypoint,
        //         tp = track[track.length - 1].waypoint;
        //     if (roadMode) {
        //         let from = this.convertToGoogleMapPoint(fp),
        //             to = this.convertToGoogleMapPoint(tp);

        //         this.directionsService.getRouteBetween(from, to)
        //             .then((response) => {
        //                 this.store.dispatch({
        //                     type: UPDATE_SEGMENT,
        //                     payload: { id: uid, track: response }
        //                 });
        //             }, function(response) {
        //                 console.error('Problem with directions service:', response)
        //             });
        //     } else {
        //         // Walk mode: add the waypoint as a track point
        //         this.store.dispatch({
        //             type: UPDATE_SEGMENT,
        //             payload: { id: uid, track: [fp, tp] }
        //         });
        //     }
        // }
        this.ol.Event.stop(e);
    };

    convertToLatLng(point) {
        const { lat, lon } = this.gridProjection.getLonLatFromMapPoint(point);
        const g = this.convertToGoogleMapPoint({ lat, lon });
        return { lat, lon, g };
    };

    convertToGoogleMapPoint(point) {
        return new window.google.maps.LatLng(point.lat, point.lon);
    };

    centreMap(options) {
        if (options) {
            const { lat, lon, zoom, northing, easting } = options;
            let mp;
            if (lat) {
                const { x, y } = this.convertToOsMapPoint({ lat, lon });
                mp = new this.os.MapPoint(x, y);
            } else {
                mp = new this.os.MapPoint(easting, northing);
            }
            this.osMap.setCenter(mp, zoom);
        }
    };

    draw() {
        const { waypoints, track } = this.props.route;
        const path = this.convertRouteToOsFormat(track);
        const routeFeature = new this.ol.Feature.Vector(
            new this.ol.Geometry.LineString(path), null, {
                strokeColor: 'red',
                strokeWidth: 4,
                strokeOpacity: 0.7
            }
        );

        const waypointsFeature = waypoints.map(w => {
            return new this.ol.Feature.Vector(this.convertToOsMapPoint(w));
        });

        // Plot route markers layer
        // let markersFeature = [];

        this.pointVectorLayer.destroyFeatures();
        this.pointVectorLayer.addFeatures(waypointsFeature);
        this.lineVectorLayer.destroyFeatures();
        this.lineVectorLayer.addFeatures([routeFeature]);
        // this.markerVectorLayer.destroyFeatures();
        // this.markerVectorLayer.addFeatures(markersFeature);
    };

    convertRouteToOsFormat(track) {
        const path = track.map(segment => {
            return segment.map(point => this.convertToOsMapPoint(point))
        });
        return flatten(path);
    }

    convertToOsMapPoint(point) {
        let mp = new this.ol.LonLat(point.lon, point.lat),
            mapPoint = this.gridProjection.getMapPointFromLonLat(mp);
        return new this.ol.Geometry.Point(mapPoint.lon, mapPoint.lat);
    };

    // updateDistance(track) {
    //     let dist = distance(track);
    //     this.store.dispatch({
    //         type: UPDATE_DETAILS,
    //         payload: { distance: dist }
    //     });
    // }

    addMarker(marker, image) {
        return new this.ol.Feature.Vector(
            this.convertToOsMapPoint(marker.point),   /* Geometry */
            { description: marker.name },             /* Attributes */
            {                                         /* Style */
                label: marker.name,
                labelAlign: 'l',
                labelXOffset: 16,
                labelYOffset: 32,
                fontFamily: 'Arial',
                fontColor: 'black',
                fontSize: '0.7em',
                externalGraphic: image,
                graphicHeight: 32,
                graphicWidth: 32,
                graphicXOffset: -16,
                graphicYOffset: -32
            }
        );
    };

    setSpot(index) {
        if (index === -1) {
            this.removeSpot();
        } else {
            this.addSpot(this.path[index]);
        }
    }

    addSpot(mapPoint) {
        var spot = new this.ol.Feature.Vector(
            mapPoint, {},
            {
                externalGraphic: 'dist/assets/images/spot.png',
                graphicHeight: 32,
                graphicWidth: 32,
                graphicXOffset: -16,
                graphicYOffset: -16
            }
        );
        this.removeSpot();
        this.spotVectorLayer.addFeatures([spot]);
    };

    removeSpot() {
        this.spotVectorLayer.removeAllFeatures();
    };

    render() {
        return <div id="map-container"></div>;
    }

    componentDidMount() {
        this.init();
    }

    componentDidUpdate() {
        this.draw();
    }

}