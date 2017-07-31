import React, { Component } from 'react';
import { area, curveCatmullRom } from 'd3-shape';
import { blueGrey100 } from 'material-ui/styles/colors';

export default class Area extends Component {

    render() {
        console.log('Area', this.props.data)
        const { scales, data } = this.props;
        const { xScale, yScale } = scales;

        const getArea = area()
            .x(d => xScale(d[0]))
            .y0(yScale(yScale.domain()[0]))
            .y1(d => yScale(d[1]))
            .curve(curveCatmullRom.alpha(0.5));

        return (
            <g>
                <path
                    className="area"
                    d={getArea(data)}
                    fill={blueGrey100} />
            </g>
        );
    }
}
