import React, { PropTypes as T, Component } from 'react'
import { camelize } from './lib/String'
const evtNames = ['click', 'mouseover', 'recenter'];

const wrappedPromise = function () {
    var wrappedPromise = {},
        promise = new Promise(function (resolve, reject) {
            wrappedPromise.resolve = resolve;
            wrappedPromise.reject = reject;
        });
    wrappedPromise.then = promise.then.bind(promise);
    wrappedPromise.catch = promise.catch.bind(promise);
    wrappedPromise.promise = promise;

    return wrappedPromise;
}

export class Marker extends Component {

    componentDidMount() {
        this.markerPromise = wrappedPromise();
        this.renderMarker();
    }

    componentDidUpdate(prevProps) {
        if ((this.props.map !== prevProps.map) ||
            (this.props.position !== prevProps.position)) {
            this.renderMarker();
        }
    }

    componentWillUnmount() {
        if (this.marker) {
            this.marker.setMap(null);
        }
    }

    renderMarker() {
        let { name, position, color, map, google, mapCenter } = this.props;
        if (!google) { return null }

        let pos = position || mapCenter;
        if (!(pos instanceof google.maps.LatLng)) {
            position = new google.maps.LatLng(pos.lat, pos.lng);
        }

        const markerStyle = {
            path: google.maps.SymbolPath.CIRCLE,
            fillColor: 'white',
            fillOpacity: 0.8,
            scale: 15,
            strokeColor: this.props.color || 'blue',
            strokeWeight: 4
        };

        const pref = {
            map: map,
            icon: markerStyle,
            position: position,
            title: this.props.name,
            label: this.props.name
        };
        this.marker = new google.maps.Marker(pref);

        evtNames.forEach(e => {
            this.marker.addListener(e, this.handleEvent(e));
        });

        this.markerPromise.resolve(this.marker);
    }

    getMarker() {
        return this.markerPromise;
    }

    handleEvent(evt) {
        return (e) => {
            const evtName = `on${camelize(evt)}`
            if (this.props[evtName]) {
                this.props[evtName](this.props, this.marker, e);
            }
        }
    }

    render() {
        return null;
    }
}

Marker.propTypes = {
    position: T.object,
    map: T.object
}

evtNames.forEach(e => Marker.propTypes[e] = T.func)

Marker.defaultProps = {
    name: 'Marker'
}

export default Marker
