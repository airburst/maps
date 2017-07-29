import { loadSearchResults } from '../actions';

export default class GeoCodeService {

    constructor(dispatch) {
        this.dispatch = (res) => dispatch(loadSearchResults(res));
        this.postcode = window.OpenSpace && new window.OpenSpace.Postcode();
        this.gaz = window.OpenSpace && new window.OpenSpace.Gazetteer();
    }

    find(place) {
        this.postcode.getLonLat(place, (loc) => {
            if (!loc) {
                this.dispatch({ type: 'noMatch', loc: null });
                return;
            }
            const eastVal = loc.getEasting().toString();
            if (eastVal.length > 3) {
                this.dispatch({ type: 'postcode', loc });
                return;
            }   // valid match
            this.findPlace(place);
        });
    }

    findPlace(place) {
        const type = 'place';
        this.gaz.getLocations(place, (loc) => {
            if (loc.length > 0) {
                this.dispatch({ type, loc });
                return;
            }
            this.dispatch({ type: 'noMatch', loc: null });
            return;
        });
    }
}
