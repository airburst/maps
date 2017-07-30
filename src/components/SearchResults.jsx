import React from 'react';
import Paper from 'material-ui/Paper';
import './Search.css';

const resultsStyle = {
    maxHeight: 440, 
    overflowY: 'auto',
    overflowX: 'hidden'
};

const ResultsList = props => {
    if (!props.searchResults || !props.searchResults.loc) { return <div/>; }
    return props.searchResults.loc.map((item, key) => {
        const { name, county, location} = item;
        const { lat, lon } = location;
        return (
            <div 
                key={'result-' + key}
                className="search-result"
                onClick={() => props.setMapCentre({ northing: lat, easting: lon })}>
                    {name}, {county}
            </div>
        );
    });
}

const SearchResults = props => {

    return !props.searchResults ? <div /> : (
        <div className="search-results-container">
            <Paper 
                style={resultsStyle}
                className="search-results" 
                zDepth={3}>
                {ResultsList(props)}
            </Paper>
        </div>
    );
}

export default SearchResults;