import React from "react";
import { min, max } from 'd3';
import styles from "../styles/styles.module.css";

import { SVG } from '@svgdotjs/svg.js'

function appendEquation(component1, component2, relationsDatabase, seenCharacters){

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
        if (!(unique.includes(result)) && !(seenCharacters.includes(result))){
            unique.push(result);
        }
    }

    // then, for each character, create a text box that includes this equation, and add the resulting character to the seenCharacters array
    unique.map( result => {
        seenCharacters.push(result);
        console.log(result);

        const history = document.getElementById('historyColumnBox');
        
        history.insertAdjacentHTML(
            'beforeend',
            `<p style="border: 1px solid black;
                    padding: 5px;
                    background-color: rgba(255,255,255,.6);
                    margin: 8px;
                    text-align: center;">
                ${component1} + ${component2} = ${result}
            </p>`
        );
    })
}

function HistoryColumn(props){
    const {width, height, relationsDatabase, seenCharacters} = props;

    if(relationsDatabase){
        
        return <g>
        {/* we use a foreignObject tag to create a section that has a fixed shape, but we want to scroll through (vertically) */}
        <foreignObject width={width} height={height} xmlns="http://www.w3.org/1999/xhtml">
        
        <div id={'historyColumnBox'}
        className={styles.historyColumnBoxStyle} style={{padding: '10px'}}
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