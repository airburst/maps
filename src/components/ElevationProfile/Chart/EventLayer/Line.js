import React from 'react';

export default ({ x, height }) => {
    return x ? (
        <line
            className="focus-line"
            id="focusLineX"
            x1={x}
            y1={0}
            x2={x}
            y2={height} />
    ) : <div />;
}
