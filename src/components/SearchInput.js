import React, { Component } from 'react';
import IconButton from 'material-ui/IconButton';
import SearchIcon from 'material-ui/svg-icons/action/search';
import { white } from 'material-ui/styles/colors';
import './Search.css';

export default class SearchInput extends Component {

    handleChange = event => {
        this.props.setSearchText(event.target.value);
        // Autocomplete
        if (event.target.value.length > 3) {
            this.props.searchPlace(event.target.value);
        } else {
            this.props.clearSearchResults();
        }
    }

    handleKeyPress = event => {
        if (event.key === 'Enter') {
            this.handleSearch();
        }
    }

    handleSearch = () => {
        this.props.searchAndSet(this.props.searchText);
    }

    render() {
        return (
            <div className="search-box">
                <input
                    className="search-input"
                    placeholder="Search for postcode or place"
                    value={this.props.searchText}
                    onKeyPress={this.handleKeyPress}
                    onChange={this.handleChange} />
                <IconButton onClick={this.handleSearch}>
                    <SearchIcon color={white} />
                </IconButton>
            </div>
        );
    }

}
