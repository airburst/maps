import React, { Component } from 'react';
import { scaleLinear } from 'd3-scale';
import ResponsiveWrapper from './ResponsiveWrapper'
import Axes from './Axes';
import Area from './Area';
import { flatten } from '../../../services/utils'
import './Chart.css';

class Chart extends Component {

    constructor() {
        super()
        this.xScale = scaleLinear();
        this.yScale = scaleLinear();
    }

    shouldComponentUpdate(nextProps) {
        return nextProps.data !== this.props.data;
    }

    render() {
        const margins = { top: 0, right: 20, bottom: 40, left: 60 };
        const data = flatten(this.props.data);
        console.log('Chart', data.length)
        const svgDimensions = {
            width: Math.max(this.props.parentWidth, 300),
            height: 335
        };

        const maxX = (data.length > 0) ? 
            data[data.length - 1][0] : 0;
        const xScale = this.xScale
            .domain([0, maxX])
            .range([margins.left, svgDimensions.width - margins.right])

        const maxY = (data.length > 0) ?
            Math.max.apply(this, data.map(d => d[1])) : 0;
        const yScale = this.yScale
            .domain([0, maxY])
            .range([svgDimensions.height - margins.bottom, margins.top])

        return (
            <div className="chart-container">
                <svg width={svgDimensions.width} height={svgDimensions.height}>
                    <Area
                        scales={{ xScale, yScale }}
                        data={data}
                    />
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

//                 <rect class="event-layer" x="0" y="0" attr.width="{{chartWidth}}" attr.height="{{chartHeight}}"
//                     (mouseover)="mouseOver($event)"
//                     (mousemove)="mouseMove($event)"
//                     (mouseout)="mouseOut($event)"
//                     >
//                 </rect>
//                 <line class="focusLine" id="focusLineX"></line>
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

//         .focusLine {
//             stroke: white;
//             stroke-width: 1px;
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

//     mouseMove(ev) {
//         let x = ev.clientX - this.margin.left,
//             labelOffset = 10,
//             labelRightBuffer = this.labelBox.width,
//             labelX = ((x + labelOffset) < (this.chartWidth - labelRightBuffer)) ? 
//                 (x + labelOffset) : 
//                 (x - labelRightBuffer - labelOffset),
//             labelY = (this.chartHeight / 2),
//             index = Math.floor(x * this.factor),
//             point = this.data[index],
//             elevationText = 'Elevation: ' + point[1].toFixed(1),    //TODO: catch errors when no point
//             distanceText = 'Distance: ' + point[0].toFixed(1);

//         // Draw the line and details box
//         d3.select('#focusLineX')
//             .attr('x1', x).attr('y1', 0)
//             .attr('x2', x).attr('y2', this.chartHeight);
//         d3.select('#focusLabelX').attr('transform', 'translate(' + labelX + ',' + labelY + ')');
//         d3.select('#elevation-text').text(elevationText);
//         d3.select('#distance-text').text(distanceText);

//         // Update the selected point (for route spot display)
//         this.store.dispatch({
//             type: UPDATE_DETAILS,
//             payload: { selectedPointIndex: index }
//         });
//     }

//     mouseOut(ev) {
//         d3.selectAll('#focusLineX, #focusLabelX').attr('style', 'display: none');

//         // Reset the selected point
//         this.store.dispatch({
//             type: UPDATE_DETAILS,
//             payload: { selectedPointIndex: -1 }
//         });
//     }

//     mouseOver(ev) {
//         d3.selectAll('#focusLineX, #focusLabelX').attr('style', 'display: null');
//     }
