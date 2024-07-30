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
  const {data, relationsDatabase, selectedDraggableCharacter} = props;

  if(data){
      return <g>
      {
          data.map( d => {
            var coords = determineCoordinates(d.index);
            var cx = coords[0];
            var cy = coords[1];
        
            return <g key={d.index+"-group-fixed"}>
              <circle key={d.index+"-fixed"}
                r={radius}
                stroke={'black'}
                strokeWidth={'2px'}
                fill={"white"}
                cx={cx}
                cy={cy}
              />

              <text key={d.index+"-text-fixed"}
              x={cx-offsetX} y={cy+offsetY} pointerEvents={'none'}>
                  {`${d.Result}`}
              </text>

            </g>
            }
          )}
          </g>
  } else {
      return <g></g>
  }
}

function onMouseDown(char, selectedDraggableCharacter, setSelectedDraggableCharacter){
  setSelectedDraggableCharacter(char);
  console.log(selectedDraggableCharacter);
}

function onMouseOver(char, selectedDraggableCharacter, setSelectedDraggableCharacter, relationsDatabase){
  if (selectedDraggableCharacter){
    console.log('hi');
    appendEquation(selectedDraggableCharacter, char, relationsDatabase);
  }

  setSelectedDraggableCharacter(null);
}

function DraggableNodes(props){
    const {data, relationsDatabase, selectedDraggableCharacter, setSelectedDraggableCharacter} = props;

    var nodeRef = React.useRef({});

    if(data){
        return <g>
        {
          data.map( d => {
            var controlledPosition = {x: 0, y: 0};

            var coords = determineCoordinates(d.index);
            var cx = coords[0];
            var cy = coords[1];
        
            return <g key={d.index+"-group-drag"}>
              <Draggable
              position={controlledPosition}
              nodeRef={nodeRef} // this line solves the findDOMNode warning
              >
                <g ref={nodeRef}>
                <circle key={d.index+"-drag"}
                  r={radius}
                  stroke={'black'}
                  strokeWidth={'2px'}
                  fill={"white"}
                  cx={cx}
                  cy={cy}
                  opacity={0.8}
                  onMouseDown={() => onMouseDown(d.Result, selectedDraggableCharacter, setSelectedDraggableCharacter)}
                  onMouseUp={() => onMouseDown(null, selectedDraggableCharacter, setSelectedDraggableCharacter)}
                  onMouseOver={() => onMouseOver(d.Result, selectedDraggableCharacter, setSelectedDraggableCharacter, relationsDatabase)}
                />

                <text
                key={d.index+"-text-drag"}
                x={cx-offsetX} 
                y={cy+offsetY}
                pointerEvents={'none'}>
                    {`${d.Result}`}
                </text>
                </g>
              </Draggable>
            </g>
              }
          )}
        </g>
    } else {
        return <g></g>
    }
}

export { StaticNodes, DraggableNodes }