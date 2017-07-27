import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { searchPlace } from '../actions';
import SearchInput from '../components/SearchInput';

const mapStateToProps = ({ search }) => {
    return search;
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ searchPlace }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchInput);
