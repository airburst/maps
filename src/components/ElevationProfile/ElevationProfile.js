import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import InfoPanel from './InfoPanel';
import Chart from './Chart';
import './ElevationProfile.css';

export default class ElevationProfile extends Component {

    componentWillReceiveProps(nextProps) {
        if (nextProps.elevation.length === 0) {
            this.props.hideElevation();
        }
    }

    render() {
        const wrapperClass = 'elevation-wrapper' + (this.props.show ? ' show' : '');
        const noData = (this.props.elevation.length === 0);

        return (
            <div className={wrapperClass}>
                <Paper
                    className="elevation-container"
                    zDepth={5}>
                    <InfoPanel
                        distance={this.props.distance}
                        ascent={this.props.ascent}
                        noData={noData}
                        show={this.props.show}
                        toggle={this.props.toggleElevation} />
                    <Chart 
                        data={this.props.elevation}
                        hover={this.props.showPoint} />
                </Paper>
            </div>
        );
    }

}
