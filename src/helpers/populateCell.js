import pickRandomCell from './pickRandomCell';
import twoOrFour from './twoOrFour';
import gridIsFilled from './gridIsFilled';

const populateCell = (grid, numberOfCells, size) => {
  const newGrid = [...grid];
  const randomCell = pickRandomCell(newGrid, numberOfCells);
  if (gridIsFilled(grid)) return newGrid;

  newGrid.filter((r, rKey) =>
    r.filter((c, cKey) => {
      if (c.index === randomCell.index) {
        c.index = rKey * size + cKey;
        c.lastIndex = rKey * size + cKey;
        c.value = twoOrFour();
        c.pop = true;
        c.ghost = -1;
      }
    })
  );
  return newGrid;
};

export default populateCell;
