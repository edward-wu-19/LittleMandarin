import React from "react";
import { min, max } from 'd3';
import styles from "../styles/styles.module.css";

import { StrokeNodes } from "./charNodes";

function BasicStrokes(props){
    const {width, height, relationsDatabase, strokeList, currentCharacter, setCurrentCharacter, availableCharacters} = props;


    return <g>
        <rect width={width} height={height} style={{fill:"tan", strokeWidth:"4", stroke:"black"}}  />

        <StrokeNodes strokeBoxWidth={width} strokeBoxHeight={height} relationsDatabase={relationsDatabase} currentCharacter={currentCharacter} setCurrentCharacter={setCurrentCharacter} strokeList={strokeList} availableCharacters={availableCharacters}/>
    </g>
}

export { BasicStrokes }