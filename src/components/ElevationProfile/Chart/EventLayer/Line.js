import React from 'react';

export const VerticalLine = ({ x, height }) => {
    return x ? (
        <line
            className="focus-line"
            x1={x}
            y1={0}
            x2={x}
            y2={height} />
    ) : <div />;
}

export const HorizontalLine = ({ x, y, width }) => {
    return y ? (
        <line
            className="focus-line"
            x1={x}
            y1={y}
            x2={width}
            y2={y} />
    ) : <div />;
}

export default VerticalLine;
