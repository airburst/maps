import { loadSearchResults, setMapCentre } from '../actions';

export default class GeoCodeService {

    constructor(dispatch, autoSet) {
        this.loadResults = (res) => dispatch(loadSearchResults(res));
        this.setCentre = (res) => dispatch(setMapCentre(res));
        this.autoSet = autoSet;
        this.postcode = window.OpenSpace && new window.OpenSpace.Postcode();
        this.gaz = window.OpenSpace && new window.OpenSpace.Gazetteer();
    }

    oneSearchResult(loc) {
        if (!loc) { return false; }
        const { lat } = loc;
        return (lat !== undefined) || (loc.length && loc.length === 1);
    }

    getCoords({ lat, lon }) {
        return { northing: lat, easting: lon };
    }

    find(place) {
        this.postcode.getLonLat(place, (loc) => {
            if (!loc) {
                this.loadResults({ type: 'noMatch', loc: null });
                return;
            }
            const eastVal = loc.getEasting().toString();
            if (eastVal.length > 3) {
                if (this.autoSet) {
                    console.log('GeoCode - set postcode', loc)
                    this.setCentre(this.getCoords(loc));
                } else {
                    this.loadResults({ type: 'postcode', loc: [loc] });
                }
                return;
            }   // valid match
            this.findPlace(place);
        });
    }

    findPlace(place) {
        const type = 'place';
        this.gaz.getLocations(place, (loc) => {
            if (loc.length > 0) {
                if (this.autoSet && this.oneSearchResult(loc)) {
                    console.log('GeoCode - set postcode', loc[0])
                    this.setCentre(this.getCoords(loc[0]));
                } else {
                    this.loadResults({ type, loc });
                }
                return;
            }
            this.loadResults({ type: 'noMatch', loc: null });
            return;
        });
    }
}
