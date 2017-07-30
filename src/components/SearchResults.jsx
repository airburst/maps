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

const ResultsList = props => {
    console.log('search results', props.searchResults)
    if (!props.searchResults) { return <div/>; }
    return props.searchResults.loc.map((item, key) => {
        const { name, county, type, location} = item;
        const { lat, lon } = location;
        return (
            <div 
                key={'result-' + key}
                className="search-result"
                onClick={() => props.setCoords({ lat, lon })}>
                    {name}, {county}, {type}
            </div>
        );
    });
}

const SearchResults = props => {

    return (
        <div className="search-results-container">
            <Paper className="search-results" zDepth={3}>
                {ResultsList(props)}
            </Paper>
        </div>
    );
}

export default SearchResults;