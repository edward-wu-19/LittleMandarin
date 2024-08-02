import React from "react";
import { min, max } from 'd3';
import styles from "../styles/styles.module.css";

import { seenCharacters } from "../pages/page";
import { SVG } from '@svgdotjs/svg.js'

function appendEquation(component1, component2, relationsDatabase){

    const width = 100;
    const height = 40;
    
    // filter the data for rows that take component 1 and component 2, in either order
    const data_subset = relationsDatabase.filter(equation => (equation.Component1 == component1 && equation.Component2 == component2) || (equation.Component1 == component2 && equation.Component2 == component1));

    // if no rows exist, then return null and send an alert
    if (data_subset.length == 0){
        alert("No equation exists.");
        return null;
    }

    // since some pairs of components can generate more than one character, we first take the array of unique resulting characters
    var unique = [];
    for (const i in data_subset){
        const result = data_subset[i].Result;

        // for each resulting character, we also filter for those that we have not seen yet
        if (!(result in unique) && !(result in seenCharacters)){
            unique.push(result);
            console.log(result, seenCharacters, result in seenCharacters);
        }
    }

    // then, for each character, create a text box that includes this equation, and add the resulting character to the seenCharacters array
    unique.map( result => {
        seenCharacters.push(result);
        console.log(result);

        document.getElementById('historyColumnBox').append( <svg width={width} height={height} 
        key={"Equation-" + data_subset[0].ID}
        className={styles.historyEquationCellStyle}
        >
            <text x={0} y={height/2} width={width} height={height} pointerEvents={'none'}>
                {component1} + {component2} = {result}
            </text>
        </svg>);
    })
}

function HistoryColumn(props){
    const {width, height, relationsDatabase} = props;

    if(relationsDatabase){
        
        return <g>
        {/* we use a foreignObject tag to create a section that has a fixed shape, but we want to scroll through (vertically) */}
        <foreignObject width={width} height={height} xmlns="http://www.w3.org/1999/xhtml">
        
        <div id={'historyColumnBox'}
        className={styles.historyColumnBoxStyle} style={{height: height, width: width, padding: '10px'}}
        >

        {/* {appendEquation("一", "内", relationsDatabase)}
        {appendEquation("十", "一", relationsDatabase)}
        {appendEquation("丨", "二", relationsDatabase)} */}

        </div>
        
        </foreignObject>
        </g>;
    } else {
        return <g></g>;
    }
}

export { appendEquation, HistoryColumn }