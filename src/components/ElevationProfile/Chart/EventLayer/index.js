import React, { Component } from 'react';
import Line from './Line';

export default class EventLayer extends Component {

    constructor() {
        super()
        this.state = { x: null }
    }

    handleMouseOver = e => {
        this.setState({ x: e.clientX });
        // this.props.hover(e.clientX);
    }

    handleMouseMove = e => {
        this.setState({ x: e.clientX });
        // this.props.hover(e.clientX);
    }

    handleMouseOut = e => {
        this.setState({ x: null });
        // this.props.hover(null);
    }

    render() {
        const { margins, svgDimensions } = this.props;
        const { height, width } = svgDimensions

        return (
            <g>
                <Line
                    x={this.state.x}
                    height={height - margins.top - margins.bottom} />
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
