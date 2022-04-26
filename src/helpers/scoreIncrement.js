import deepCopy from './deepCopy';

const scoreIncrement = (grid) => {
  let scoreInc = 0;
  const gridCopy = deepCopy(grid)
    .flat()
    .filter((n) => n.merged);
  gridCopy.forEach((cell) => {
    scoreInc += cell.value;
  });
  return scoreInc;
};

export default scoreIncrement;
