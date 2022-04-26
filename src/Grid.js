import React, { useState, useEffect, Fragment } from 'react';
import Cell from './Cell';
import createGrid from './helpers/createGrid';
import populateCell from './helpers/populateCell';
import populateInitialCells from './helpers/populateInitialCells';
import resetAnimation from './helpers/resetAnimation';
import gridUpdated from './helpers/gridUpdated';
import deepCopy from './helpers/deepCopy';
import scoreIncrement from './helpers/scoreIncrement';
import restoreIndexes from './helpers/restoreIndexes';
import createBgcVar from './helpers/createBgcVar';
import gridIsFilled from './helpers/gridIsFilled';
import checkForGameOver from './helpers/checkForGameOver';
import { useSwipeable } from 'react-swipeable';

// import useSound from 'use-sound';

import { moveLeft, moveRight, moveDown, moveUp } from './helpers/movement';

const Grid = (props) => {
  const [grid, setGrid] = useState();
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gridIsPopulated, setGridIsPopulated] = useState(false);
  const [shouldSpawnCell, setShouldSpawnCell] = useState(false);
  const numberOfCells = props.size * props.size;

  const handlers = useSwipeable({
    onSwiped: (eventData) => onDirectionChange(eventData.dir),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  useEffect(() => {
    setGrid(() => createGrid(props.size));
    setGridIsPopulated(true);
  }, []);

  useEffect(() => {
    resetAnimation();
    if (grid) {
      setScore((prev) => prev + scoreIncrement(grid) * 0.5);
      if (gridIsFilled(grid)) {
        setGameOver(checkForGameOver(grid, props.size));
      }
    }
  }, [grid]);

  useEffect(() => {
    if (!gridIsPopulated) return;
    setGrid(populateInitialCells(grid, props.size, numberOfCells));
  }, [gridIsPopulated]);

  useEffect(() => {
    if (shouldSpawnCell) {
      setGrid(populateCell(grid, numberOfCells, props.size));
      setShouldSpawnCell(false);
    }
  }, [shouldSpawnCell]);

  const changeDirection = (direction) => {
    const oldGrid = deepCopy(grid);
    const newGrid = restoreIndexes(
      direction(deepCopy(grid), props.size),
      props.size
    );
    setGrid(newGrid);
    if (gridUpdated(oldGrid, newGrid)) {
      setShouldSpawnCell(true);
    }
  };

  const onDirectionChange = (direction) => {
    switch (direction) {
      case 'Up':
        changeDirection(moveUp);
        break;
      case 'Down':
        changeDirection(moveDown);
        break;
      case 'Left':
        changeDirection(moveLeft);
        break;
      case 'Right':
        changeDirection(moveRight);
        break;
      default:
    }
  };

  useEffect(() => {
    const setVh = () => {
      document.body.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
    };
    setVh();
    window.addEventListener('resize', setVh);
    return () => {
      window.removeEventListener('resize', setVh);
    };
  }, []);

  const restartGameHandle = () => {
    setGrid(() => createGrid(props.size));
    setGridIsPopulated(true);

    setShouldSpawnCell(true);

    setScore(0);
    setGameOver(false);
  };

  // if (window.Worker) {
  //   const myWorker = new Worker('./helpers/worker.js');
  //   myWorker.postMessage([10, 10]);
  //   myWorker.onmessage = function (e) {
  //     console.log('Message received from worker', e);
  //   };
  // } else {
  //   console.log("Your browser doesn't support web workers.");
  // }

  return (
    grid && (
      <>
        <div {...handlers} className="grid-wrap">
          <h4 className="score">Score: {score}</h4>
          <h4 className="title">2048</h4>
          <div
            className="grid"
            style={{
              '--gridDim': props.size,
              '--cellSize': `${props.cellSize}px`,
              '--gap': `${props.gap}px`,
              '--bgcPattern': createBgcVar(
                props.size,
                props.cellSize,
                props.gap
              ),
            }}
          >
            {[...grid].map((row, rowKey) => {
              return [...row].map((cell, cellKey) => {
                return (
                  cell.value !== 0 && (
                    <Fragment key={rowKey * props.size + cellKey}>
                      <Cell
                        index={cell.index}
                        lastIndex={cell.lastIndex}
                        value={cell.value}
                        gridSize={props.size}
                        pop={cell.pop}
                        ghost={false}
                        merged={cell.merged}
                      />

                      {cell.ghost !== -1 && (
                        <Fragment>
                          <Cell
                            index={cell.index}
                            lastIndex={cell.ghost}
                            value={cell.value * 0.5}
                            gridSize={props.size}
                            pop={cell.pop}
                            ghost={true}
                          />
                          <Cell
                            index={cell.index}
                            lastIndex={cell.lastIndex}
                            value={cell.value * 0.5}
                            gridSize={props.size}
                            pop={cell.pop}
                            ghost={true}
                          />
                        </Fragment>
                      )}
                    </Fragment>
                  )
                );
              });
            })}
          </div>
        </div>

        {gameOver && (
          <div className="gameOver">
            <h2>Game Over</h2>
            <h4>Final score: {score}</h4>
            <button onClick={restartGameHandle}>restart</button>
          </div>
        )}

        {/* <button onClick={() => {
          setGrid(prev => prev)
        }} style={{position: 'absolute', bottom: 0}}>undo</button> */}
      </>
    )
  );
};

export default Grid;
