import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
    toggleElevation,
    hideElevation,
    showPoint
} from '../../actions';
import ElevationProfile from './ElevationProfile';

const mapStateToProps = ({ route, settings }) => {
    const { elevation, distance, ascent } = route;
    return {
        elevation,
        distance,
        ascent,
        show: settings.showElevation
    }
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        toggleElevation,
        hideElevation,
        showPoint
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(ElevationProfile);
