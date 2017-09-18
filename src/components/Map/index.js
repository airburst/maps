import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../../actions/route';
import Map from './Map';

const mapStateToProps = ({ settings, route }) => {
    return {
        settings,
        route
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators(Actions, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Map);
