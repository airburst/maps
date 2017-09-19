import { connect } from 'react-redux';
import { } from '../../actions/route';
import Embed from './Embed';

const mapStateToProps = ({ settings, route }) => {
    return {
        settings,
        route
    };
};

export default connect(mapStateToProps, {})(Embed);