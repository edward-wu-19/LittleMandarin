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

function uploadChars(setAvailableCharacters, file) {
    var textFromFileLoaded;
    var fileReader = new FileReader();
    fileReader.readAsText(file);
    fileReader.onload = function(fileLoadedEvent){
        textFromFileLoaded = fileLoadedEvent.target.result;

        // split by comma
        setAvailableCharacters(textFromFileLoaded.split(',').sort());
    };
}

function MenuBar(props){
    const {width, height, availableCharacters, setAvailableCharacters} = props;

     // Reference to the hidden file input
    const fileInputRef = React.useRef(null);

    // Function to handle file selection
    const handleFileSelect = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click(); 
            // Trigger the file input
        }
    };

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
          // Call uploadChars with the file
          uploadChars(setAvailableCharacters, file);
        }
      };

    return <g>
        <rect width={width} height={height} 
        style={{fill:"tan", strokeWidth:"4", stroke:"black"}}/>

        <foreignObject width={width} height={height} xmlns="http://www.w3.org/1999/html">
        
        <input type="button" id="button_download" value="Download" onClick={() => {downloadChars(availableCharacters)}} />

        <input ref={fileInputRef} type='file' id='fileToLoad' style={{display:'none'}} onChange={handleFileUpload} />

        <button id="file_upload" onClick={() => {handleFileSelect()}}>Load Selected File</button>
        
        </foreignObject>
    </g>
}

export { MenuBar }