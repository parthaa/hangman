import React from 'react';
const hangPortrait = (props) => {
    const hang = `
      |
      |
      |
      |
      |
=========,
  +---+
  |   |
      |
      |
      |
      |
=========,
  +---+
  |   |
  O   |
      |
      |
      |
=========,
  +---+
  |   |
  O   |
  |   |
      |
      |
=========,
  +---+
  |   |
  O   |
 /|   |
      |
      |
=========,
  +---+
  |   |
  O   |
 /|\\  |
      |
      |
=========,
  +---+
  |   |
  O   |
 /|\\  |
 /    |
      |
=========,
  +---+
  |   |
  O   |
 /|\\  |
 / \\  |
      |
=========`.split(",");

   const portrait = props.index && props.index <= hang.length && props.index > 0 ? hang[props.index-1] : '';
   const style = {
     fontFamily: 'monospace',
     whiteSpace: 'pre'
   };
   return (
        <div style={style}>
          {portrait}
        </div>
    );
}

export default hangPortrait;