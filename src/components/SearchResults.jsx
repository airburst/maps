import React from 'react';
import Paper from 'material-ui/Paper';
import './Search.css';

const SearchResults = props => {

    // const Results = props.

    const handleClick = event => console.log(event.target);

    return (
        <div className="search-results-container">
            <Paper className="search-results" zDepth={3}>
                <div 
                    className="search-result"
                    onClick={handleClick}>
                        8 Tawney Close
                </div>
                <div 
                    className="search-result"
                    onClick={handleClick}>
                        10 Tawney Close
                </div>
            </Paper>
        </div>
    );
}

export default SearchResults;