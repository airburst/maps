import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../actions/route';
import RouteList from '../components/RouteList';

const mapStateToProps = ({ user }) => {
    return user;
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators(Actions, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(RouteList);
