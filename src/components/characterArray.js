import React from "react";
import { min, max } from 'd3';
import styles from "../styles/styles.module.css";

import { StaticNodes } from "./charNodes";

function CharacterArray(props){
    const {width, height, relationsDatabase, availableCharacters} = props;

    const [currentCharacter, setCurrentCharacter] = React.useState(null);

    return <React.Fragment>
        <rect 
        className={styles.charArrayStyle} 
        style={{fill:"tan", strokeWidth:"8", stroke:"brown"}} 
        width={width} height={height} 
        onClick={() => onClickArrayBackground(setCurrentCharacter)}/>

        <StaticNodes relationsDatabase={relationsDatabase} currentCharacter={currentCharacter} setCurrentCharacter={setCurrentCharacter} availableCharacters={availableCharacters}/>
    </React.Fragment>
}

function onClickArrayBackground(setCurrentCharacter){
    setCurrentCharacter(null);
}

export { CharacterArray }