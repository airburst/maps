import React from 'react';

export default ({ x, y }) => {
    return x ? (
        <circle
            className="focus-point"
            cx={x}
            cy={y}
            r={4} />
    ) : <div />;
}
