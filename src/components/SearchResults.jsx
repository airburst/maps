import React from 'react';
import Paper from 'material-ui/Paper';
import './Search.css';

// const oneSearchResult = ({ type, loc }) => {
// 	if (!loc) { return false; }
// 	const { lat, lon } = loc;
// 	return (lat !== undefined )|| (loc.length && loc.length === 1);
// }

// const getLatLon = ({ loc }) => {
// 	let { lat, lon } = loc;
// 	if (lat === undefined) { 
// 		let { lat, lon } = loc[0].location;
// 	};
// 	return { lat, lon };
// }

const resultsStyle = {
    maxHeight: 440, 
    overflowY: 'auto',
    overflowX: 'hidden'
};

const ResultsList = props => {
    if (!props.searchResults) { return <div/>; }
    return props.searchResults.loc.map((item, key) => {
        const { name, county, type, location} = item;
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