import { trunc } from './GeometryService';

export default class DirectionsService {

    constructor() {
        this.service = new window.google.maps.DirectionsService();
    }

    getRouteBetween(from, to) {
        return new Promise((resolve, reject) => {
            this.service.route({
                origin: this.convertToGoogleMapPoint(from),
                destination: this.convertToGoogleMapPoint(to),
                travelMode: window.google.maps.DirectionsTravelMode.BICYCLING
            }, (result, status) => {
                if (status === window.google.maps.DirectionsStatus.OK) {
                    const googleMapPath = result.routes[0].overview_path;
                    const points = googleMapPath.map(p => {
                        return {
                            lat: trunc(p.lat(), 6),
                            lon: trunc(p.lng(), 6)
                    };
                });
            resolve(points);
        }
                reject({
                message: 'There was a problem getting directions data.',
                status: status,
                type: 'Directions Service Error'
            });
    });
});
    }

convertToGoogleMapPoint(point) {
    return new window.google.maps.LatLng(point.lat, point.lon);
}

}