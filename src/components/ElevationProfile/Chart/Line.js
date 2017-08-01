import React from 'react'
import './Chart.css'

export default ({ x }) => {
    console.log('Line', x)

    return (
        <g>
            {
                x ? (
                    <line
                        className="focusLine"
                        id="focusLineX"
                        x={x} />
                ) : <div />
            }
        </g>
    );

}