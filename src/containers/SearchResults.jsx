import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setCoords } from '../actions';
import SearchResults from '../components/SearchResults';

const mapStateToProps = ({ search }) => {
    return search;
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ setCoords }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchResults);
