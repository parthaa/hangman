import React from 'react';
const keyboard = (props) => {
    const keyboardLayout = 'abcdefghijklmnopqrstuvwxyz';
    const style = {
        display: "inline-block",
        textAlign: "center",
        border: "1px solid black",
        margin: "5px",
        padding: "5px"
    };

    let snippets = keyboardLayout.split('').map(letter =>
        (<div key={letter} style={style} onClick={props.clicked.bind(this, letter)}> {letter} </div>)
    );
   return (
        <div>
            {snippets}
        </div>
    );
}

export default keyboard;