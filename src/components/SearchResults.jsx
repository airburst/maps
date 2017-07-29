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

const ResultsList = results => {
    if (!results) { return <div/>; }
    return results && results.filter(r => r.type === 'place')
        .map(item => {
            const { name, county, type, location} = item.loc;
            const { lat, lon } = location;
            console.log(name, county, type, lat, lon)
            return (
                <div 
                    className="search-result"
                    onClick={this.props.setCoords({ lat, lon })}>
                        {name}, {county}, {type}
                </div>
            );
        });
}

const SearchResults = props => {
    console.log('search results', props)
    
    const handleClick = event => console.log(event.target);

    return (
        <div className="search-results-container">
            <Paper className="search-results" zDepth={3}>
                {ResultsList(props.searchResults)}
            </Paper>
        </div>
    );
}

export default SearchResults;