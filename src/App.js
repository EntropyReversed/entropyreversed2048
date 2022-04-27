import React, { useState } from 'react';
import './style.scss';
import Grid from './Grid';
import createBgcVar from './helpers/createBgcVar';

const gridCombinations = [
  ['Tiny', 3, 0.76],
  ['Classic', 4, 0.575],
  ['Big', 5, 0.462],
  ['Bigger', 6, 0.387],
  ['Huge', 8, 0.293],
];

const gridPreview = (size, cellSize, gap, downgradeMultiplier = 0.3) => {
  return (
    <div
      className="grid"
      style={{
        '--gridDim': size,
        '--cellSize': `${cellSize * downgradeMultiplier}px`,
        '--gap': `${gap * downgradeMultiplier}px`,
        '--bgcPattern': createBgcVar(
          size,
          cellSize * downgradeMultiplier,
          gap * downgradeMultiplier
        ),
      }}
    ></div>
  );
};

const maxWidth = (size, cellSize, gap, downgradeMultiplier = 0.3) => {
  return (size * (cellSize + gap) + gap) * downgradeMultiplier;
};

export default function App() {
  const [newGame, setNewGame] = useState(false);
  const [gridSize, setGridSize] = useState(4);
  const [cellSize, setCellSize] = useState(70);
  const [gap, setGap] = useState(10);
  const [currentGrid, setCurrentGrid] = useState(0);

  const pickGrid = (index) => {
    if (
      currentGrid + index < 0 ||
      currentGrid + index > gridCombinations.length - 1
    )
      return;
    setCurrentGrid((prev) => prev + index);
  };

  return (
    <>
      {!newGame && (
        <div className="homescreen">
          <h1>2048</h1>
          <div
            className="selection-wrap"
            style={{
              '--current': currentGrid,
              '--width': maxWidth(
                gridCombinations[gridCombinations.length - 1][1],
                cellSize,
                gap
              ),
              '--numberOfItems': gridCombinations.length,
            }}
          >
            <div className="selection-wrap__inner">
              {gridCombinations.map((grid, key) => {
                return (
                  <div key={key} className="selection">
                    {gridPreview(grid[1], cellSize, gap, grid[2])}
                    <span>
                      {grid[0]}({grid[1]}x{grid[1]})
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="buttons-wrap">
            <button
              className={`prev ${currentGrid === 0 ? 'disabled' : ''}`}
              onClick={() => pickGrid(-1)}
            >
              &lt;
            </button>
            <button onClick={() => setNewGame(true)}>start game</button>
            <button
              className={`next ${
                currentGrid === gridCombinations.length - 1 ? 'disabled' : ''
              }`}
              onClick={() => pickGrid(1)}
            >
              &gt;
            </button>
          </div>
        </div>
      )}

      {newGame && (
        <Grid
          size={gridCombinations[currentGrid][1]}
          cellSize={70}
          gap={10}
          setNewGame={setNewGame}
        />
      )}
    </>
  );
}
