import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { 
    searchPlace, 
    searchAndSet,
    setSearchText, 
    clearSearchResults
} from '../actions';
import SearchInput from '../components/SearchInput';

const mapStateToProps = ({ search }) => {
    return search;
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ 
        searchPlace, 
        setSearchText, 
        clearSearchResults, 
        searchAndSet 
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchInput);
