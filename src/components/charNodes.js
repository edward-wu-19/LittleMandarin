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
  const {data, relationsDatabase, selectedDraggableCharacter, currentHoveredCharacter, setCurrentHoveredCharacter} = props;

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
                onMouseEnter={() => onMouseEnterStatic(d.Result, setCurrentHoveredCharacter)}
                onMouseLeave={() => onMouseLeaveStatic(setCurrentHoveredCharacter)}
                ondrop={() => console.log('drop')}
              />

              <text key={d.index+"-text-fixed"}
              x={cx-offsetX} y={cy+offsetY}>
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

function onMouseEnterStatic(char, setCurrentHoveredCharacter){
  setCurrentHoveredCharacter(char);
  console.log('hover ', char);
}

function onMouseLeaveStatic(setCurrentHoveredCharacter){
  setCurrentHoveredCharacter(null);
  console.log('leave');
}

function onMouseDown(char, setSelectedDraggableCharacter){
  setSelectedDraggableCharacter(char);
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

function DraggableNodes(props){
    const {data, relationsDatabase, selectedDraggableCharacter, setSelectedDraggableCharacter, currentHoveredCharacter, setCurrentHoveredCharacter} = props;

    var nodeRef = React.useRef({});

    // this conditional is to keep track of when to turn off the interactiveness of the draggable nodes. when a draggable node is being dragged, the program turns off all other draggable nodes so that only the static nodes are left. then if the draggable node is released while the mouse is on a static node, it will call appendEquation from the historyColumn component.
    const getInteractive = (sel, char) => (sel != null & sel != char) ? 'none':'all';
    const getInteractive2 = (sel, char) => (sel != null & sel != char) ? 0:1;
    // nodes should turn off (interaction) if selectedDraggableCharacter is not null and it is not equal to the node's character

    if(data){
        return <g>
        {
          data.map( d => {
            var controlledPosition = {x: 0, y: 0};

            var coords = determineCoordinates(d.index);
            var cx = coords[0];
            var cy = coords[1];
        
            return <g key={d.index+"-group-drag"}
              pointerEvents={getInteractive(selectedDraggableCharacter, d.Result)}>
              <Draggable
              position={controlledPosition}
              nodeRef={nodeRef} // this line solves the findDOMNode warning
              >
                <g ref={nodeRef}>
                <circle key={d.index+"-drag"}
                  r={radius}
                  stroke={'black'}
                  strokeWidth={'2px'}
                  fill={"red"}
                  cx={cx}
                  cy={cy}
                  opacity={0.8*getInteractive2(selectedDraggableCharacter, d.Result)}
                  // when the mouse is pressed down and the node gets dragged, the draggable node must be marked as the hovered node
                  onMouseDown={() => onMouseDown(d.Result, setSelectedDraggableCharacter)}
                  
                  onMouseUp={() => onMouseUp(relationsDatabase, selectedDraggableCharacter, setSelectedDraggableCharacter, currentHoveredCharacter, setCurrentHoveredCharacter)}
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