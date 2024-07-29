import React from "react";
import { min, max } from 'd3';
import styles from "../styles/styles.module.css";

var seenCharacters = [];

function appendEquation(width, height, component1, component2, relationsDatabase){
    
    // filter the data for rows that take component 1 and component 2, in either order
    const data_subset = relationsDatabase.filter(equation => (equation.Component1 == component1 && equation.Component2 == component2) || (equation.Component1 == component2 && equation.Component2 == component1));

    // if no rows exist, then return null and send an alert
    if (data_subset.length == 0){
        alert("No equation exists.");
        return null;
    }

    // if there are multiple (there should not be but human error in the dataset...), send a different alert
    if (data_subset.length >= 2){
        alert("Too many equations.");
        return null;
    }

    const result = data_subset[0].Result;

    // if the resulting character already has been made, send a different alert
    if (result in seenCharacters){
        alert(result + " already seen!");
        return null;
    }

    // otherwise, create a text box that includes this equation, and add the resulting character to the seenCharacters array
    seenCharacters.push(result);
    const equation = <g key={"Equation-" + data_subset[0].ID}>
        <text className={styles.historyEquationCellStyle} width={width} height={height}>
            {component1} + {component2} = {result}
        </text>
    </g>

    return equation;
}

function HistoryColumn(props){
    const {width, height, relationsDatabase} = props;

    if(relationsDatabase){
        
        return <g>
        {/* we use a foreignObject tag to create a section that has a fixed shape, but we want to scroll through (vertically) */}
        <foreignObject width={width} height={height} xmlns="http://www.w3.org/1999/xhtml">
        
        <div 
        className={styles.historyColumnBoxStyle} style={{height: height, width: width, padding: '10px'}}
        >

        {appendEquation(width-20, 100, "一", "内", relationsDatabase)}

        </div>
        
        </foreignObject>
        </g>;
    } else {
        return <g></g>;
    }
}

export { HistoryColumn }