import React, { Component } from 'react';
import { bisector } from 'd3-array';
import { HorizontalLine, VerticalLine } from './Line';
import Circle from './Circle';
import { trunc } from '../../../../services/GeometryService';

export default class EventLayer extends Component {

    constructor() {
        super()
        this.state = { x: null }
    }

    handleMouseOver = e => {
        const x = e.clientX;
        this.setState({ x });
        this.props.hover(this.getIndex(x));
    }

    handleMouseMove = e => {
        const x = e.clientX;
        this.setState({ x: e.clientX });
        this.props.hover(this.getIndex(x));
    }

    handleMouseOut = e => {
        this.setState({ x: null });
        this.props.hover(null);
    }

    getIndex = (x) => {
        if (!x) { return null; }
        const { scales, data } = this.props;
        const bisectDist = bisector(d => d[0]).left;
        const dist = scales.xScale.invert(x);
        return bisectDist(data, dist, 1);
    }

    getData = x => {
        if (!x) { return { dist: 0, ele: 0 }; }
        const index = this.getIndex(x);
        return { 
            dist: trunc(this.props.data[index][0]), 
            ele: this.props.data[index][1]
        };
    }

    render() {
        const { margins, svgDimensions, scales } = this.props;
        const { height, width } = svgDimensions;
        const { yScale } = scales;
        const { dist, ele } = this.getData(this.state.x);
        const y = (ele > 0) ? yScale(ele) : null;

        return (
            <g>
                <VerticalLine
                    x={this.state.x}
                    height={height - margins.top - margins.bottom} />
                <HorizontalLine
                    x={margins.left}
                    y={y}
                    width={width - margins.right} />
                <Circle
                    x={this.state.x}
                    y={y} />
                <rect
                    className="event-layer"
                    x={margins.left}
                    width={width - margins.left - margins.right}
                    height={height - margins.top - margins.bottom}
                    onMouseOver={this.handleMouseOver}
                    onMouseMove={this.handleMouseMove}
                    onMouseOut={this.handleMouseOut} />
            </g>
        )
    }
}
