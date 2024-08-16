import React from "react";
import { min, max } from 'd3';
import styles from "../styles/styles.module.css";

import { appendEquation } from "./historyColumn";

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

  const getRadius = character => character === currentCharacter ? 20 : 14;
  const getColor = character => character === currentCharacter ? "pink" : "white";
  const getStrokeWidth = character => character === currentCharacter ? "4px" : "2px";

  const getNodeTextClassName = character => character === currentCharacter ? styles.nodeTextSelectedClassStyle : styles.nodeTextUnselectedClassStyle;
  const getTextOffsetX = character => character === currentCharacter ? -11 : -8;
  

  var index = 0;

  availableCharacters.sort();

  return <g id={'inner'}>
  {
    availableCharacters.map( character => {
        var coords = determineCoordinates(index);
        var cx = coords[0];
        var cy = coords[1];

        // increment index to generate the next node's coordinates
        index += 1;
    
        return <g key={character+"-group"}
            transform={`translate(${cx},${cy})`}
            onClick={() => onClick(character, currentCharacter, setCurrentCharacter, relationsDatabase, availableCharacters)}
            >
          <circle key={character+"-fixed"}
            r={`${getRadius(character)}`}
            stroke={'black'}
            strokeWidth={`${getStrokeWidth(character)}`}
            fill={`${getColor(character)}`}
            cx={0} cy={0}
          />

          <text key={character+"-text"}
          x={`${getTextOffsetX(character)}`} y={6}
          className={`${getNodeTextClassName(character)}`}>
              {`${character}`}
          </text>

        </g>
        }
      )}
  </g>;
}

function onClick(character, currentCharacter, setCurrentCharacter, relationsDatabase, availableCharacters){

  // if no character is currently selected, then set this character as the current character
  if (!currentCharacter){
    setCurrentCharacter(character);
  }
  // otherwise, check if the currently selected character makes a pair with this character (potentially the same)
  else{
    appendEquation(currentCharacter, character, relationsDatabase, availableCharacters);
    setCurrentCharacter(null);
  }
}

export { StaticNodes }