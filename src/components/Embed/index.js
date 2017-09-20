import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getEmbedRoute } from '../../actions/route';
import Embed from './Embed';

const mapStateToProps = ({ settings, route }) => {
    return {
        settings,
        route
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        getEmbedRoute
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Embed);