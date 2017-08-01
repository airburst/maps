import React, { Component } from 'react';
import { scaleLinear } from 'd3-scale';
import ResponsiveWrapper from './ResponsiveWrapper'
import Axes from './Axes';
import Area from './Area';
import EventLayer from './EventLayer';
import { flatten } from '../../../services/utils'
import './Chart.css';

class Chart extends Component {

    constructor() {
        super()
        this.xScale = scaleLinear();
        this.yScale = scaleLinear();
    }

    shouldComponentUpdate(nextProps) {
        return nextProps.data !== this.props.data ||
            nextProps.parentWidth !== this.props.parentWidth;
    }

    render() {
        const margins = { top: 0, right: 20, bottom: 40, left: 60 };
        const data = flatten(this.props.data);
        // console.log('Chart', data.length)                               //
        const svgDimensions = {
            width: Math.max(this.props.parentWidth, 300),
            height: 335
        };

        const maxX = (data.length > 0) ?
            data[data.length - 1][0] : 0;
        const xScale = this.xScale
            .domain([0, maxX])
            .range([margins.left, svgDimensions.width - margins.right]);

        const maxY = (data.length > 0) ?
            Math.max.apply(this, data.map(d => d[1])) + 10 : 0;
        const yScale = this.yScale
            .domain([0, maxY])
            .range([svgDimensions.height - margins.bottom, margins.top]);

        return (
            <div className="chart-container">
                <svg width={svgDimensions.width} height={svgDimensions.height}>
                    <Area
                        scales={{ xScale, yScale }}
                        data={data}
                    />
                    <EventLayer
                        scales={{ xScale, yScale }}
                        margins={margins}
                        svgDimensions={svgDimensions}
                        data={data}
                        hover={this.props.hover} />
                    <Axes
                        scales={{ xScale, yScale }}
                        margins={margins}
                        svgDimensions={svgDimensions}
                    />
                </svg>
            </div>
        )
    }
}

export default ResponsiveWrapper(Chart);

//                 <g class="focusLabel" id="focusLabelX" style="display: none;">
//                     <rect class="label-box" x="0" y="-30" rx="3" ry="3" attr.width="{{labelBox.width}}" attr.height="{{labelBox.height}}"></rect>
//                     <text x="0" y="0">
//                         <tspan id="elevation-text" x="10" y="-7">ele</tspan>
//                         <tspan id="distance-text" x="10" y="20">dist</tspan>
//                     </text>
//                 </g>

//     styles: [`
//         .hidden {
//             display: none;
//         }

//         .event-layer {
//             fill: transparent;
//             cursor: crosshair;
//         }

//         .focusLabel {
//             fill: black;
//             font-size: 1.6em;
//         }

//         .label-box {
//             fill: white;
//             stroke: black;
//             stroke-width: 1;
//         }
//     `]
// })
