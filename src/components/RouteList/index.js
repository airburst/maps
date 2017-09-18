import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as Actions from '../../actions/route';
import RouteList from './RouteList';

const mapStateToProps = ({ user }) => {
    return { user };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators(Actions, dispatch);
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RouteList));
