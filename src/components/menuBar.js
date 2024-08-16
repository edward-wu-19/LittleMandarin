import React from "react";
import { min, max } from 'd3';
import styles from "../styles/styles.module.css";

function downloadChars(characters) {
    let text = characters.join(',');
    let filename = "download.txt";

    let element = document.createElement('a');
    element.setAttribute('href',
        'data:text/plain;charset=utf-8, '
        + encodeURIComponent(text));
    element.setAttribute('download', filename);

    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}

function uploadChars(availableCharacters, setAvailableCharacters) {
    var fileToLoad = document.getElementById("fileToLoad").files[0];
    var textFromFileLoaded;
    var fileReader = new FileReader();
    fileReader.onload = function(fileLoadedEvent){
        textFromFileLoaded = fileLoadedEvent.target.result;

        // split by comma
        setAvailableCharacters(textFromFileLoaded.split(','));

        console.log(availableCharacters);
    };

    fileReader.readAsText(fileToLoad, "UTF-8");

    console.log('done');
}

function MenuBar(props){
    const {width, height, availableCharacters, setAvailableCharacters} = props;

    return <g>
        <rect width={width} height={height} 
        style={{fill:"tan", strokeWidth:"4", stroke:"black"}}/>

        <foreignObject width={width} height={height} xmlns="http://www.w3.org/1999/html">
        
        <input type="button" id="button_download" value="Download" onClick={() => {downloadChars(availableCharacters)}} />

        <input type="file" id="fileToLoad"/>

        <button onClick={() => {uploadChars(availableCharacters, setAvailableCharacters)}}>Load Selected File</button>
        
        </foreignObject>
    </g>
}

export { MenuBar }