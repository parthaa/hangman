import React from 'react';

const charComp = (props) => {
    let style = {
        display: "inline-block",
        padding: "16px",
        textAlign: "center",
        margin: "2px",
        border: "1px solid black"
    };
    return (
        <div style={style} onClick={props.clicked}>
            <p> {props.character} </p>
        </div>
    );
}

export default charComp;
