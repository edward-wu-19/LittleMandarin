import React from "react";
import { min, max } from 'd3';
import styles from "../styles/styles.module.css";

function GoalBox(props){
    const {width, height} = props;


    return <g>
        <rect className={styles.goalBoxStyle} width={width} height={height} style={{fill:"tan", strokeWidth:"4", stroke:"black"}}/>

        <text x={width/2} y={20} textAnchor="middle" className={styles.goalBoxTextStyle}>上  下  左  右</text>
    </g>
}

export { GoalBox }