import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
    toggleFollowsRoads,
    clearRoute,
    removePoint,
    goToRouteList
} from '../../actions';
import Toolbox from './Toolbox';

const mapStateToProps = ({ user, route }) => {
    return {
        user,
        route
    };
};

const mapDispatchToProps = dispatch => {
    return Object.assign({},
        bindActionCreators({
            toggleFollowsRoads,
            clearRoute,
            removePoint,
        }, dispatch),
        { goToRouteList });
};

export default connect(mapStateToProps, mapDispatchToProps)(Toolbox);