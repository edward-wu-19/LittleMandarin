import React from "react";
import { min, max } from 'd3';
import styles from "../styles/styles.module.css";

import { StaticNodes, DraggableNodes } from "./charNodes";

function CharacterArray(props){
    const {width, height, startingDatabase, relationsDatabase} = props;

    const [currentCharacter, setCurrentCharacter] = React.useState(null);

    return <g>
        <rect className={styles.charArrayStyle} style={{fill:"tan", strokeWidth:"8", stroke:"brown"}} width={width} height={height} onClick={() => onClickArrayBackground(setCurrentCharacter)}/>

        <StaticNodes data={startingDatabase} relationsDatabase={relationsDatabase} currentCharacter={currentCharacter}setCurrentCharacter={setCurrentCharacter} />
        {/* <DraggableNodes data={startingDatabase} relationsDatabase={relationsDatabase} selectedDraggableCharacter={selectedDraggableCharacter} setSelectedDraggableCharacter={setSelectedDraggableCharacter} currentHoveredCharacter={currentHoveredCharacter} setCurrentHoveredCharacter={setCurrentHoveredCharacter} /> */}
    </g>
}

function onClickArrayBackground(setCurrentCharacter){
    setCurrentCharacter(null);
    console.log('background');
}

export { CharacterArray }