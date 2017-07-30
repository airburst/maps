import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setMapCentre, resetSearch } from '../actions';
import SearchResults from '../components/SearchResults';

const mapStateToProps = ({ search }) => {
    return search;
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ setMapCentre, resetSearch }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchResults);
