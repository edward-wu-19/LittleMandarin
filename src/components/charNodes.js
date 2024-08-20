import React from "react";
import { min, max } from 'd3';
import styles from "../styles/styles.module.css";

import { appendEquation } from "./historyColumn";

function determineCoordinates(characterArrayWidth, index){
    // used to put the characters into a grid like array
    const margin = 40;
    const elements_per_row = 7;

    const sep = (characterArrayWidth - 2 * margin) / (elements_per_row - 1);

    // everything, including rows and columns, is zero-indexed
    const row_number = Math.floor(index / elements_per_row);
    const column_number = index % elements_per_row;
    
    const x = margin + column_number * sep;
    const y = margin + row_number * sep;

    return [x, y];
}

function fadeColorOut(character, color){
  var node = document.getElementById(character+"-circle");

  var fadestyle = null;

  switch (color) {
    case 'red':
      fadestyle = styles.fade_red;
      break;
    case 'yellow':
      fadestyle = styles.fade_yellow;
      break;
    case 'green':
      fadestyle = styles.fade_green;
      break;
    default:
      fadestyle = null;
      break;
  }
  
  node.classList.toggle(fadestyle);

  // Use a timeout to reset the color back to blue after 1 second
  setTimeout(function() {
      node.classList.remove(fadestyle);
  }, 3000); // Match the duration of the transition
}

function StrokeNodes(props){
  const {strokeBoxWidth, strokeBoxHeight, relationsDatabase, currentCharacter, setCurrentCharacter, strokeList, availableCharacters} = props;

  const getRadius = character => character === currentCharacter ? 20 : 14;
  const getColor = character => character === currentCharacter ? "pink" : "white";
  const getStrokeWidth = character => character === currentCharacter ? "4px" : "2px";

  const getNodeTextClassName = character => character === currentCharacter ? styles.nodeTextSelectedClassStyle : styles.nodeTextUnselectedClassStyle;
  const getTextOffsetX = character => character === currentCharacter ? -11 : -8;
  
  var index = 0;

  return <g>
  {
    strokeList.map( character => { 
      // technically, character is a stroke but I am reusing from the staticNodes function
        var cx = strokeBoxWidth / (1+strokeList.length) * (index+1);
        var cy = strokeBoxHeight / 2;

        // increment index to generate the next node's coordinates
        index += 1;
    
        return <g key={character+"-group"}
            transform={`translate(${cx},${cy})`}
            onClick={() => onClick(character, currentCharacter, setCurrentCharacter, relationsDatabase, availableCharacters)}
            >
          <circle key={character+"-circle"}
            id={character+"-circle"}
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

function StaticNodes(props){
  const {characterArrayWidth, relationsDatabase, currentCharacter, setCurrentCharacter, availableCharacters} = props;

  const getRadius = character => character === currentCharacter ? 20 : 14;
  const getColor = character => character === currentCharacter ? "pink" : "white";
  const getStrokeWidth = character => character === currentCharacter ? "4px" : "2px";

  const getNodeTextClassName = character => character === currentCharacter ? styles.nodeTextSelectedClassStyle : styles.nodeTextUnselectedClassStyle;
  const getTextOffsetX = character => character === currentCharacter ? -11 : -8;
  
  var index = 0;

  return <g>
  {
    availableCharacters.map( character => {
        var coords = determineCoordinates(characterArrayWidth, index);
        var cx = coords[0];
        var cy = coords[1];

        // increment index to generate the next node's coordinates
        index += 1;
    
        return <g key={character+"-group"}
            transform={`translate(${cx},${cy})`}
            onClick={() => onClick(character, currentCharacter, setCurrentCharacter, relationsDatabase, availableCharacters)}
            >
          <circle key={character+"-circle"}
            id={character+"-circle"}
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

  // remove color from any potential fade
  var node = document.getElementById(character+"-circle");
  node.classList.remove(styles.fade_red, styles.fade_yellow, styles.fade_green);


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

export { StrokeNodes, StaticNodes, fadeColorOut }