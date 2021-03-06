class GeolocationService {

    constructor() {
        this.timeout = 10;
        this.maxAge = 5;
        this.options = {
            timeout: this.timeout * 1000,
            maximumAge: this.maxAge * 60 * 1000,
            enableHighAccuracy: false
        };
    }

    isSupported() {
        return ("geolocation" in navigator)
    }

    getLocation() {
        return new Promise((resolve: any, reject: any) => {
            navigator.geolocation.getCurrentPosition((p) => {
                resolve(p.coords);
            }, reject, this.options);
        });
    }

    geoError(error) {
        // error.code can be:
        //   0: unknown error
        //   1: permission denied
        //   2: position unavailable (error response from location provider)
        //   3: timed out
        return { error: error.code };
    };

    // TODO: use callback or observable    
    watch(callback) {
        if (!this.hasWatch) {
            this.watchId = navigator.geolocation.watchPosition(
                position => { callback({ lat: position.coords.latitude, lng: position.coords.longitude }); },
                error => { console.log('Geolocation error', error); },
                this.options
            );
            this.hasWatch = true;
        }
    }

    clearWatch() {
        if (this.hasWatch) { navigator.geolocation.clearWatch(this.watchId); }
    }

}

export default GeolocationService