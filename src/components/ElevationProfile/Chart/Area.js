import React, { Component } from 'react';
import { scaleLinear } from 'd3-scale';
import { interpolateLab } from 'd3-interpolate';
import { blueGrey400 } from 'material-ui/styles/colors';

export default class Area extends Component {

    render() {
        const { scales, margins, data, svgDimensions } = this.props
        const { xScale, yScale } = scales
        const { height } = svgDimensions

        const bars = (
            data.map(datum =>
                <rect
                    key={datum[0]}
                    x={xScale(datum[0])}
                    y={yScale(datum[1])}
                    height={height - margins.bottom - scales.yScale(datum[1])}
                    width={xScale.bandwidth()}
                    fill={blueGrey400}
                />
            )
        )

        return (
            <g>{bars}</g>
        )
    }
}