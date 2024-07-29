// Remember to npm install bootstrap, react-boostrap, react, d3 in local project directory!!

import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import { csv, json, local } from "d3";
import { Row, Col, Container } from "react-bootstrap";

import { CharacterArray } from "../components/characterArray";
import { BasicStrokes } from "../components/basicStrokes";
import { MenuBar } from "../components/menuBar";
import { HistoryColumn } from "../components/historyColumn";

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

function GamePage(){
    const relationsDatabase = useRelationsData(relationsDatabasePath);
    // console.log(relationsDatabase);

    const page_width = 500; // use 500 for when the page is just half the screen
    const page_height = 776;

    const menu_width = page_width;
    const menu_height = 20;
    const history_width = 150;
    const history_height = page_height - menu_height;
    const strokes_width = page_width - history_width;
    const strokes_height = 20;
    const chars_width = strokes_width;
    const chars_height = page_height - menu_height - strokes_height;
    
    return <Container>
        {/* Top row is the menu bar */}
        <Row className={"justify-content-md-left"}>
            <Col lg={10} >
                <h4 className={styles.h1Style}>Menu Bar</h4> 
                <svg 
                className={styles.menuStyle} 
                id={"menu"} 
                width={menu_width} 
                height={menu_height}>
                    <MenuBar 
                    width={menu_width} 
                    height={menu_height}
                    />
                </svg>
            </Col>
        </Row>  

        {/* Then on the left we have the history */}
        <Row className={"justify-content-md-left"}>
        <Col lg={3} >
            <h4>History</h4>
            <svg 
            className={styles.mapStyle} 
            id={"map"} 
            width={history_width} 
            height={history_height}>
                <HistoryColumn
                width={history_width} 
                height={history_height}/>
            </svg>
        </Col>

        <Col>
            <Container>
                {/* On the right side, we have the basic strokes on top ... */}
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