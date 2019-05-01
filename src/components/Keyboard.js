import React from 'react';
const keyboard = (props) => {
    const keyboardLayout = ['qwertyoiup','asdfghjkl', 'zxcvbnm'];
    const style = {
        display: "inline-block",
        textAlign: "center",
        border: "1px solid black",
        margin: "5px",
        padding: "16px"
    };

    let snippets = keyboardLayout.map((row, index) => {
        const rowSnippet = row.split('').map(letter => (<div key={letter} style={style} onClick={props.clicked.bind(this, letter)}> {letter} </div>));
        return (<div className="row" key={index}> {rowSnippet} </div>);
    });

   return (
        <div>
            {snippets}
        </div>
    );
}

export default keyboard;