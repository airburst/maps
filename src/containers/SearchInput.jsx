import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { searchPlace, setSearchText } from '../actions';
import SearchInput from '../components/SearchInput';

const mapStateToProps = ({ search }) => {
    return search;
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ searchPlace, setSearchText }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchInput);
