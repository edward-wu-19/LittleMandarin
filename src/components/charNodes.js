import React from "react";
import Draggable from 'react-draggable';
import { min, max } from 'd3';
import styles from "../styles/styles.module.css";

import { appendEquation } from "./historyColumn";

const radius = 14;
const offsetX = radius / 2 + 1;
const offsetY = radius / 2 - 1;

function determineCoordinates(index){
    // used to put the characters into a grid like array
    const margin = 60;
    const sep = 50;
    const elements_per_row = 6;

    // everything, including rows and columns, is zero-indexed
    const row_number = Math.floor(index / elements_per_row);
    const column_number = index % elements_per_row;
    
    const x = margin + column_number * sep;
    const y = margin + row_number * sep;

    return [x, y];
}

function StaticNodes(props){
  const {relationsDatabase, currentCharacter, setCurrentCharacter, availableCharacters} = props;

  var index = 0;

  return <g>
  {
    availableCharacters.map( character => {
        var coords = determineCoordinates(index);
        var cx = coords[0];
        var cy = coords[1];

        console.log(character, cx, cy);

        // increment index to generate the next node's coordinates
        index += 1;
    
        return <g key={character+"-group"}
            // onClick={() => onClick(d.Result, currentCharacter, setCurrentCharacter, relationsDatabase, seenCharacters)}
            >
          <circle key={character+"-fixed"}
            r={radius}
            stroke={'black'}
            strokeWidth={'2px'}
            fill={"white"}
            cx={cx}
            cy={cy}
          />

          <text key={character+"-text"}
          x={cx-offsetX} y={cy+offsetY}>
              {`${character}`}
          </text>

        </g>
        }
      )}
  </g>;
}

function onClick(char, currentCharacter, setCurrentCharacter, relationsDatabase, seenCharacters){

  // if no character is currently selected, then set this character as the current character
  if (!currentCharacter){
    setCurrentCharacter(char);
    // console.log('if' + char);
  }
  // otherwise, check if the currently selected character makes a pair with this character (potentially the same)
  else{
    appendEquation(currentCharacter, char, relationsDatabase, seenCharacters);
    setCurrentCharacter(null);
    // console.log('else' + char);
  }
}

function onMouseUp(relationsDatabase, selectedDraggableCharacter, setSelectedDraggableCharacter, currentHoveredCharacter, setCurrentHoveredCharacter){
  // this function runs appendEquation ONLY if the mouse is currently hovered on a character and the mouse is let go, the latter of which we check by putting this in the mouse event onMouseUp
  console.log(currentHoveredCharacter);
  if (selectedDraggableCharacter & currentHoveredCharacter){
    console.log('hello');
    appendEquation(selectedDraggableCharacter, currentHoveredCharacter, relationsDatabase);
  }

  // regardless of if an equation is created, both variables need to be reset
  console.log('up');
  setSelectedDraggableCharacter(null);
  setCurrentHoveredCharacter(null);
}

export { StaticNodes }