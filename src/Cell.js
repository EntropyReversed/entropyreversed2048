import React from 'react';

const colors = {
  0: '#ccc0b3',
  2: '#eee4da',
  4: '#ede0c8',
  8: '#f2b179',
  16: '#f59563',
  32: '#f67c5f',
  64: '#f65e3b',
  128: '#edcf72',
  256: '#edcc61',
  512: '#edc850',
  1024: '#edc850',
  2048: '#edc850',
};

const Cell = (props) => {
  return (
    <div
      className={`cell ${props.pop ? 'pop' : ''} ${
        props.ghost ? 'ghost' : ''
      } ${props.merged ? 'merged' : ''}`}
      style={{
        '--backgroudColor':
          props.value <= 2048 ? colors[props.value] : '#1a1608',
        '--color': props.value <= 4 ? 'black' : 'white',
        '--lastXpos': props.lastIndex % props.gridSize,
        '--lastYpos': Math.floor(props.lastIndex / props.gridSize),
        '--xpos': props.index % props.gridSize,
        '--ypos': Math.floor(props.index / props.gridSize),
      }}
    >
      <div className="cell__inner">
        {/* <span
          style={{ position: 'absolute', top: 0, left: 0, fontSize: `16px` }}
        >
          {props.index}
        </span> */}
        {/* <span
          style={{
            position: 'absolute',
            top: 0,
            left: 'auto',
            right: 0,
            fontSize: `16px`,
          }}
        >
          {props.lastIndex}
        </span> */}

        {props.value}
      </div>
    </div>
  );
};

export default Cell;
