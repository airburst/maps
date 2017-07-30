import React, { Component } from 'react';
import IconButton from 'material-ui/IconButton';
import SearchIcon from 'material-ui/svg-icons/action/search';
import { white } from 'material-ui/styles/colors';
import './Search.css';

export default class SearchInput extends Component {

    constructor() {
        super();
        this.state = {
            searchText: ''
        }
    }

    handleKeyPress = event => {
        if (event.key === 'Enter') { 
            this.handleSearch(); 
        }
    }

    handleChange = event => {
        this.setState({ searchText: event.target.value });
        // if (event.target.value.length > 3) {
        //     this.props.searchPlace(event.target.value);
        // }
    }

    handleSearch = () => {
        this.props.searchPlace(this.state.searchText);
    }

    render() {
        return (
            <div className="search-box">
                <input
                    className="search-input"
                    placeholder="Search for postcode or place"
                    value={this.state.searchText}
                    onKeyPress={this.handleKeyPress}
                    onChange={this.handleChange} />
                <IconButton onClick={this.handleSearch}>
                    <SearchIcon color={white} />
                </IconButton>
            </div>
        );
    }
}
