import mirror from './mirror';
import removeZeroesAndAddNumbers from './removeZeroesAndAddNumbers';
import restoreZeros from './restoreZeros';
import transpose from './transpose';

const moveLeft = (grid, size) => {
  const newGrid = [];
  grid.forEach((r, rIndex) => {
    newGrid.push(
      mirror(restoreZeros(removeZeroesAndAddNumbers(mirror(r)), size, rIndex))
    );
  });
  return newGrid;
};

const moveRight = (grid, size) => {
  const newGrid = [];
  grid.forEach((r, rIndex) => {
    newGrid.push(restoreZeros(removeZeroesAndAddNumbers(r), size, rIndex));
  });
  return newGrid;
};

const moveDown = (grid, size) => {
  return transpose(moveRight(transpose(grid), size));
};

const moveUp = (grid, size) => {
  return transpose(moveLeft(transpose(grid), size));
};

export { moveLeft, moveRight, moveDown, moveUp };
