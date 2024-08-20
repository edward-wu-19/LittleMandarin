// Remember to npm install bootstrap, react-boostrap, react, d3, @svgdotjs/svg.js in local project directory!!

import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import { csv, json, local } from "d3";
import { Row, Col, Container } from "react-bootstrap";

import { CharacterArray } from "../components/characterArray";
import { BasicStrokes } from "../components/basicStrokes";
import { MenuBar } from "../components/menuBar";
import { HistoryColumn } from "../components/historyColumn";
import { GoalBox } from "../components/goalBox";

import styles from "../styles/styles.module.css";

const relationsDatabasePath = "https://raw.githubusercontent.com/edward-wu-19/LittleMandarin/main/src/components/sampleRelationsData.csv";

function useRelationsData(csvPath){
    const [dataAll, setData] = React.useState(null);
    React.useEffect(() => {
        csv(csvPath).then(data => {
            data.forEach(d => {
                d.index = d.ID - 1;
            });
            setData(data);
        });
    }, [csvPath]);
    return dataAll;
}

const startingCharactersPath = "https://raw.githubusercontent.com/edward-wu-19/LittleMandarin/main/src/components/sampleStartingCharacters.csv";

function loadStartingSet(csvPath, availableCharacters){
    csv(csvPath).then(data => {
        data.forEach(d => {
            if (!(availableCharacters.includes(d.Character))){
                availableCharacters.push(d.Character);
            }
        });
    });
}

function GamePage(){
    const [availableCharacters, setAvailableCharacters] = React.useState([]);

    const relationsDatabase = useRelationsData(relationsDatabasePath);
    
    const page_width = 600; // use 600 for when the page is just half the screen
    const page_height = 900;

    const menu_width = 200;
    const menu_height = 60;
    const history_width = menu_width;
    const history_height = page_height - menu_height;

    const goal_width = page_width - menu_width;
    const goal_height = 30;
    const strokes_width = goal_width;
    const strokes_height = 40;
    const chars_width = goal_width;
    const chars_height = page_height - menu_height - strokes_height - 5;

    // load starting characters
    if(availableCharacters.length == 0){
        loadStartingSet(startingCharactersPath, availableCharacters);
    }
    
    return <Container>
        {/* On the left side, we have the menu bar on top */}
        <Row className={"justify-content-md-left"}>
        <Col lg={3} >
            <Row>
            <Col>
                <h4 className={styles.h1Style}>Menu Bar</h4> 
                <svg 
                className={styles.menuStyle} 
                id={"menu"} 
                width={menu_width} 
                height={menu_height}>
                    <MenuBar 
                    width={menu_width} 
                    height={menu_height}
                    availableCharacters={availableCharacters}
                    setAvailableCharacters={setAvailableCharacters}
                    />
                </svg>
            </Col>
            </Row>

            {/* And under that, we have the history column */}
            <Row className={"justify-content-md-left"}>
            <Col>
                <h4>History</h4>
                <svg 
                className={styles.historyColumnStyle} 
                id={"historyColumn"} 
                width={history_width} 
                height={history_height}>
                    <HistoryColumn
                    width={history_width} 
                    height={history_height}
                    />
                </svg>
            </Col>
            </Row>
        </Col>

        <Col>
            <Container>
                {/* On the right side, we have the current goal displayed on top ... */}
                <Row>
                    <Col lg={10}>
                        <h4>Current Goal</h4>
                        <svg 
                        className={styles.goalBoxStyle} 
                        id={"currentGoal"} 
                        width={goal_width} 
                        height={goal_height}>
                            <GoalBox
                            width={goal_width}
                            height={goal_height}/>
                        </svg>
                    </Col>
                </Row>

                {/* then we have the basic strokes underneath */}
                <Row>
                    <Col lg={10}>
                        <h4>Basic Strokes</h4>
                        <svg 
                        className={styles.strokesStyle} 
                        id={"basicStrokes"} 
                        width={strokes_width} 
                        height={strokes_height}>
                            <BasicStrokes
                            width={strokes_width}
                            height={strokes_height}/>
                        </svg>
                    </Col>
                </Row> 

                {/* ... and the character array on bottom */}
                <Row>
                    <Col lg={10}>
                        <h4>Character Array</h4>
                        
                        <svg 
                        className={styles.charsStyle} 
                        id={"characterArray"} 
                        width={chars_width} 
                        height={chars_height}>
                            <CharacterArray 
                            width={chars_width}
                            height={chars_height}
                            relationsDatabase={relationsDatabase}
                            availableCharacters={availableCharacters}
                            />
                        </svg>
                    </Col>
                </Row> 
            </Container>
        </Col>
        </Row>
    </Container>
}

export default GamePage