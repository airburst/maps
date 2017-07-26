export default class DirectionsService {

    constructor() {
        this.service = new window.google.maps.DirectionsService();
    }

    getRouteBetween(from, to) {
        return new Promise((resolve, reject) => {
            this.service.route({
                origin: from,
                destination: to,
                travelMode: window.google.maps.DirectionsTravelMode.BICYCLING
            }, (result, status) => {
                if (status === window.google.maps.DirectionsStatus.OK) {
                    const googleMapPath = result.routes[0].overview_path;
                    const points = googleMapPath.map(p => {
                        return { lat: p.lat(), lon: p.lng() };
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
    };

}