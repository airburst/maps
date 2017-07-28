import geocoder from 'google-geocoder';

export default class GeoCodeService {

    constructor(key) {
        this.geo = geocoder({ key });
        this.find('SN13 9XE').then(r => console.log(r))     //debug
    }

    find(searchText) {
        return new Promise((resolve, reject) => {
            return this.geo.find(searchText, (err, results) => {
                if (err) { reject(err); }
                resolve(results);
            });
        });
    }

}
