import React, { Component } from 'react';
import IconButton from 'material-ui/IconButton';
import SearchIcon from 'material-ui/svg-icons/action/search';
import { white } from 'material-ui/styles/colors';
import './SearchInput.css';

export default class SearchInput extends Component {

    constructor() {
        super();
        this.state = {
            searchText: ''
        }
    }

    handleChange = (event) => {
        this.setState({ searchText: event.target.value });
        if (event.target.value.length > 3) {
            this.props.searchPlace(event.target.value);
        }
    }

    render() {
        console.log(this.props)
        return (
            <div className="search-box">
                <input
                    className="search-input"
                    placeholder="Search for postcode or place"
                    value={this.state.searchText}
                    onChange={this.handleChange} />
                <IconButton><SearchIcon color={white} /></IconButton>
            </div>
        );
    }
}
