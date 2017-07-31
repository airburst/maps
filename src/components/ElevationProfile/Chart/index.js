import React, { Component } from 'react';
import { scaleBand, scaleLinear } from 'd3-scale';
import ResponsiveWrapper from './ResponsiveWrapper'
import Axes from './Axes';
import Bars from './Bars';
import './Chart.css';

const data = [
    [1, 100],
    [2, 90],
    [3, 79],
    [4, 83],
    [5, 89],
    [6, 103],
    [7, 105],
    [8, 100]
];

class Chart extends Component {

    constructor() {
        super()
        this.xScale = scaleBand()
        this.yScale = scaleLinear()
    }

    render() {
        const margins = { top: 0, right: 20, bottom: 40, left: 60 };
        // const svgDimensions = { width: 800, height: 335 };
        const svgDimensions = {
            width: Math.max(this.props.parentWidth, 300),
            height: 335
        };
        const maxValue = Math.max(...data.map(d => d[1]));

        const xScale = this.xScale
            .padding(0.5)
            .domain(data.map(d => d[0]))
            .range([margins.left, svgDimensions.width - margins.right])

        const yScale = this.yScale
            .domain([0, maxValue])
            .range([svgDimensions.height - margins.bottom, margins.top])

        return (
            <div className="chart-container">
                <svg width={svgDimensions.width} height={svgDimensions.height}>
                    <Axes
                        scales={{ xScale, yScale }}
                        margins={margins}
                        svgDimensions={svgDimensions}
                    />
                    <Bars
                        scales={{ xScale, yScale }}
                        margins={margins}
                        data={data}
                        maxValue={maxValue}
                        svgDimensions={svgDimensions}
                    />
                </svg>
            </div>
        )
    }
}

export default ResponsiveWrapper(Chart);

// import {flatten} from './utils/utils';


//         <svg [ngClass]="{hidden: hideSVG}" attr.width="{{width}}" attr.height="{{height}}">
//             <g attr.transform="translate({{margin.left}},{{margin.top}})">
//                 <path class="area"></path>
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
//                 <g class="x axis">
//                     <path class="domain"></path>
//                     <text class="x label" style="text-anchor: end;">Distance (km)</text>
//                 </g>
//                 <g class="y axis">
//                     <path class="domain"></path>
//                     <text class="y label" style="text-anchor: end;">Elevation (m)</text>
//                 </g>
//             </g>
//         </svg>


//     styles: [`
//         .hidden {
//             display: none;
//         }

//         .axis path, .axis line {
//             fill: none;
//             stroke: white;
//         }

//         .area {
//             fill: #666;
//         }

//         .x.label, .y.label, .x.axis, .y.axis {
//             fill: white;
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

// export class ElevationChart implements OnInit {

//     constructor(
//         public elementRef: ElementRef,
//         public store: Store<AppStore>
//     ) { }

//     private route: RouteObserver;
//     private data: any[];
//     private hideSVG: boolean;
//     private x: any;
//     private y: any;
//     private xAxis: any;
//     private yAxis: any;
//     private area: any;
//     private width: number;
//     private chartWidth: number;
//     private height: number = 244;
//     private chartHeight: number;
//     private margin: any = { top: 10, right: 10, bottom: 20, left: 40 };
//     private transitionTime: number = 250;
//     private factor: number;
//     private labelBox: any = { width: 160, height: 60 };

//     ngOnInit() {
//         this.width = parseInt(d3.select('.chart').style('width'));
//         this.chartWidth = this.width - this.margin.left - this.margin.right;
//         this.chartHeight = 244 - this.margin.top - this.margin.bottom;   

//         // Subscribe to changes in elevation observable 
//         this.route = new RouteObserver(this.store);
//         this.route.elevation$.subscribe((v) => {
//             this.data = this.addDistanceToData(flatten(v));
//             this.factor = this.data.length / this.chartWidth;
//             this.update();
//         });
//     }

//     addDistanceToData(elevation: any[]): any[] {
//         let averageDistance = this.store.getState().details.distance / elevation.length,
//             chartData: any[] = [];
//         elevation.forEach((ele, i) => {
//             chartData.push([averageDistance * i, ele]);
//         });
//         return chartData;
//     }

//     update() {
//         this.hideSVG = (this.data.length === 0) ? true : false;
//         let el: any = this.elementRef.nativeElement;
//         let graph: any = d3.select(el);

//         this.x = d3.scale.linear().range([0, this.chartWidth]);
//         this.y = d3.scale.linear().range([this.chartHeight, 0]);
//         this.xAxis = d3.svg.axis().scale(this.x).orient("bottom");
//         this.yAxis = d3.svg.axis().scale(this.y).orient("left");
//         this.x.domain(d3.extent(this.data, function(d) { return d[0]; }));
//         this.y.domain([0, d3.max(this.data, function(d) { return +d[1]; })]);

//         this.area = d3.svg.area()
//             .x(function(d) { return this.x(d[0]); })
//             .y0(this.chartHeight)
//             .y1(function(d) { return this.y(d[1]); })
//             .interpolate('basis');

//         d3.select('.x.axis')
//             .attr('transform', 'translate(0,' + this.chartHeight + ')')
//             .call(this.xAxis);
//         d3.select('.x.label')
//             .attr('x', this.chartWidth)
//             .attr('y', -10);
//         d3.select('.y.axis').call(this.yAxis);
//         d3.select('.y.label')
//             .attr("transform", "rotate(-90)")
//             .attr("y", 6)
//             .attr("dy", ".71em");

//         let svg = graph.transition();

//         if (this.data.length > 0) {
//             svg.select(".area").duration(this.transitionTime).attr("d", this.area(this.data));
//             svg.select(".x.axis").duration(this.transitionTime).call(this.xAxis);
//             svg.select(".y.axis").duration(this.transitionTime).call(this.yAxis);
//         }
//     }

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

// }
