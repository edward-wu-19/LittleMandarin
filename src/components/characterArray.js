import React from "react";
import { min, max } from 'd3';
import styles from "../styles/styles.module.css";

import { StaticNodes, DraggableNodes } from "./charNodes";

function CharacterArray(props){
    const {width, height, relationsDatabase} = props;

    const [selectedDraggableNode, setSelectedDraggableNode] = React.useState(null);

    return <g>
        <rect className={styles.charArrayStyle} style={{fill:"tan", strokeWidth:"8", stroke:"brown"}} width={width} height={height} />

        <StaticNodes data={relationsDatabase} selectedDraggableNode={selectedDraggableNode}/>
        <DraggableNodes data={relationsDatabase} selectedDraggableNode={selectedDraggableNode} setSelectedDraggableNode={setSelectedDraggableNode} />
    </g>
}

export { CharacterArray }