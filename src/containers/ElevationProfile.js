import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { toggleElevation, hideElevation } from '../actions';
import ElevationProfile from '../components/ElevationProfile';

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
    return bindActionCreators({ toggleElevation, hideElevation }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(ElevationProfile);
