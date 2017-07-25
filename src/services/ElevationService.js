import { flatten, chunk } from './utils';

export default class ElevationService {

    constructor(followsRoads = true) {
        this.followsRoads = followsRoads;
        this.results = [];
        this.elevator = new window.google.maps.ElevationService();
        this.status = window.google.maps.ElevationStatus;
        this.sampleSize = 200;
        this.throttle = 2000;   // 2 seconds
    };

    getElevationDataWithThrottle(segment) {
        // this.clear();
        this.getElevationData(segment, true);
    }

    getElevationData(track, isThrottled) {
        if (track === undefined || track.length <= 1) { return []; }
        const throttle = isThrottled ? this.throttle : 0;
        const path = this.convertToGoogleRoute(track);
        const pathArray = chunk(path, this.sampleSize);

        // Publish recalculation estimate for infopanel to render
        // const recalcTime = pathArray.length * throttle / 1000;
        // this.publishRecalcTime(recalcTime);

        const elevationPromises = pathArray.map((p, i) => {
            return this.elevation(i * throttle, p);
        });

        return Promise.all(elevationPromises)
            .then(response => flatten(response).map(e => Math.floor(e.elevation)))
            .catch(error => console.log(error));
    }

    extractTrackFromElevationResponse(response) {
        return response.map(p => {
            return { lat: p.location.lat(), lon: p.location.lng() }
        });
    };

    convertToGoogleRoute(points) {
        return points.map(point => {
            return new window.google.maps.LatLng(point.lat, point.lon);
        });
    };

    elevation(delay, path) {
        return new Promise((resolve, reject) => {
            if (path.length <= 1) { reject('No elevation requested: no path'); }
            const data = {
                path,
                samples: ((path.length < this.sampleSize) && this.followsRoads) ? path.length : this.sampleSize
            };
            setTimeout(() => {
                this.elevator.getElevationAlongPath(data, (results, status) => {
                    if (status === this.status.OK) {
                        if (results[0]) { resolve(results); }
                        reject('No valid result was determined from the Google Elevation service. Please try again');
                    }
                    reject('Google Elevation service was not available. Please try again. ' + status);
                });
            }, delay);
        });
    };

    // calculateElevation(elevations) {
    //     let ascent = 0,
    //         lastElevation = elevations[0];
    //     //reduce
    //     elevations.forEach((e) => {
    //         ascent += (e > lastElevation) ? (e - lastElevation) : 0;
    //         lastElevation = e;
    //     });
    //     return { ascent: Math.floor(ascent) };
    // }

    // clear() {
    //     this.store.dispatch({ type: CLEAR_ELEVATION });
    // }

    // publishRecalcTime(duration) {
    //     this.store.dispatch({
    //         type: UPDATE_DETAILS,
    //         payload: { recalculateTime: duration }
    //     });
    // }

}