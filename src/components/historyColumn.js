import React from "react";
import { min, max } from 'd3';
import styles from "../styles/styles.module.css";

import { fadeColorOut } from "./charNodes";

function appendEquation(component1, component2, relationsDatabase, availableCharacters){

    // filter the data for rows that take component 1 and component 2, in either order
    const data_subset = relationsDatabase.filter(equation => (equation.Component1 == component1 && equation.Component2 == component2) || (equation.Component1 == component2 && equation.Component2 == component1));

    // if no rows exist, then return null and paint those two nodes red
    if (data_subset.length == 0){
        // alert("No equation exists.");
        fadeColorOut(component1, "red");
        fadeColorOut(component2, "red");
        return null;
    }

    // since some pairs of components can generate more than one character, we first take the array of unique resulting characters
    var unique = [];
    for (const i in data_subset){
        const result = data_subset[i].Result;

        // for each resulting character, we also filter for those that we have not seen yet
        if (!(unique.includes(result)) && !(availableCharacters.includes(result))){
            unique.push(result);
        }
    }

    // otherwise, at least one character can be created, so shine the two component characters green and the new characters yellow
    fadeColorOut(component1, "green");
    fadeColorOut(component2, "green");

    var history = document.getElementById('historyColumnBox');

    // then, for each character, create an equation, and add the resulting character to the availableCharacters array
    unique.map( result => {
        availableCharacters.push(result);
        
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

        setTimeout(function() {
            fadeColorOut(result, 'yellow');
        }, 1);
    })
}

function HistoryColumn(props){
    const {width, height} = props;

    // we use a foreignObject tag to create a section that has a fixed shape, but we want to scroll through (vertically), which will be implemented in the future
    return <g>
        <foreignObject width={width} height={height} xmlns="http://www.w3.org/1999/html">
        
        <div id={'historyColumnBox'}
        className={styles.historyColumnBoxStyle} style={{padding: '10px', overflowY: 'scroll', height: `${height}px`}}
        >

        </div>
        
        </foreignObject>
    </g>;
}

export { appendEquation, HistoryColumn }