import populateCell from './populateCell';

const populateInitialCells = (grid, size, numberOfCells) => {
  let newGrid;
  for (let i = 0; i < size - 1; i++) {
    newGrid = populateCell(grid, numberOfCells, size);
  }
  return newGrid;
};

export default populateInitialCells;
