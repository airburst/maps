import React, { Component } from 'react';
import SearchResults from '../../containers/SearchResults';
import { flatten } from '../../services/utils';

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
    };

    centreAndSetMapEvents = () => {
        this.centreMap();
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
        const { waypoints } = this.props.route;
        const lastWaypoint = waypoints.slice(-1);
        this.props.addPoint(p);
        if (waypoints.length > 0) {
            this.props.addTrack([...lastWaypoint, p], this.props.followsRoads);
        }
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

    centreMap() {
        const { lat, lon, northing, easting } = this.props.coords;
        console.log(lat, lon, northing, easting)                            //
        let mp;
        if (lat) {
            const { x, y } = this.convertToOsMapPoint({ lat, lon });
            mp = new this.os.MapPoint(x, y);
        } else {
            mp = new this.os.MapPoint(easting, northing);
        }
        this.osMap.setCenter(mp, this.props.zoom);
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

    // addMarker(marker, image) {
    //     return new this.ol.Feature.Vector(
    //         this.convertToOsMapPoint(marker.point),   /* Geometry */
    //         { description: marker.name },             /* Attributes */
    //         {                                         /* Style */
    //             label: marker.name,
    //             labelAlign: 'l',
    //             labelXOffset: 16,
    //             labelYOffset: 32,
    //             fontFamily: 'Arial',
    //             fontColor: 'black',
    //             fontSize: '0.7em',
    //             externalGraphic: image,
    //             graphicHeight: 32,
    //             graphicWidth: 32,
    //             graphicXOffset: -16,
    //             graphicYOffset: -32
    //         }
    //     );
    // };

    // setSpot(index) {
    //     if (index === -1) {
    //         this.removeSpot();
    //     } else {
    //         this.addSpot(this.path[index]);
    //     }
    // }

    // addSpot(mapPoint) {
    //     var spot = new this.ol.Feature.Vector(
    //         mapPoint, {},
    //         {
    //             externalGraphic: 'dist/assets/images/spot.png',
    //             graphicHeight: 32,
    //             graphicWidth: 32,
    //             graphicXOffset: -16,
    //             graphicYOffset: -16
    //         }
    //     );
    //     this.removeSpot();
    //     this.spotVectorLayer.addFeatures([spot]);
    // };

    // removeSpot() {
    //     this.spotVectorLayer.removeAllFeatures();
    // };

    render() {
        return <div id="map-container">
            <SearchResults />
        </div>;
    }

    componentDidMount() {
        this.init();
    }

    componentDidUpdate() {
        this.draw();
    }

}