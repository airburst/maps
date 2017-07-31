import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { toggleElevation } from '../actions';
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
    return bindActionCreators({ toggleElevation }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(ElevationProfile);
