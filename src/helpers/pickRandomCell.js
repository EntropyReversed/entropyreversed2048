import gridIsFilled from './gridIsFilled';

const pickRandomCell = (grid, numberOfCells) => {
  if (gridIsFilled(grid)) return;
  const pickRandom = () => {
    let randomCell = grid.flat()[Math.floor(Math.random() * numberOfCells)];
    if (randomCell.value === 0) {
      return randomCell;
    } else {
      return pickRandom();
    }
  };
  return pickRandom();
};

export default pickRandomCell;
