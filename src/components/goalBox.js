import React from "react";
import { min, max } from 'd3';
import styles from "../styles/styles.module.css";

function GoalBox(props){
    const {width, height} = props;


    return <g>
        <rect className={styles.goalBoxStyle} width={width} height={height} style={{fill:"tan", strokeWidth:"4", stroke:"black"}}/>

        <text x={10} y={20} className={styles.goalBoxTextStyle}>一二三四五六七八九十</text>
    </g>
}

export { GoalBox }