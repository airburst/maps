import { loadSearchResults } from '../actions';

export default class GeoCodeService {

    constructor(dispatch) {
        this.dispatch = (res) => dispatch(loadSearchResults(res));
        this.postcode = window.OpenSpace && new window.OpenSpace.Postcode();
        this.gaz = window.OpenSpace && new window.OpenSpace.Gazetteer();
    }

    find(place) {
        this.postcode.getLonLat(place, (res) => {
            if (!res) {
                this.dispatch(null);
                return;
            }
            const eastVal = res.getEasting().toString();
            if (eastVal.length > 3) {
                this.dispatch(res);
                return;
            }   // valid match
            this.findPlace(place);
        });
    }

    findPlace(place) {
        this.gaz.getLocations(place, (res) => {
            console.log('place results', res)
            if (res.length > 1) {
                this.dispatch(res);
                return;
            }
            if (res.length === 1) {
                this.dispatch(res[0]);
                return;
            }
            this.dispatch(null);
            return;
        });
    }
}
