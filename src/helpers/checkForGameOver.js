import deepCopy from './deepCopy';
import { moveLeft, moveRight, moveDown, moveUp } from './movement';

const invalidMove = (direction, grid, size) => {
  return (
    direction(deepCopy(grid), size)
      .flat()
      .filter((n) => n.value === 0).length === 0
  );
};

const checkForGameOver = (grid, size) => {
  if (
    invalidMove(moveLeft, grid, size) &&
    invalidMove(moveRight, grid, size) &&
    invalidMove(moveUp, grid, size) &&
    invalidMove(moveDown, grid, size)
  ) {
    return true;
  }
  return false;
};

export default checkForGameOver;
