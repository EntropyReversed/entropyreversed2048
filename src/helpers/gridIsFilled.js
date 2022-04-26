const gridIsFilled = (grid) => {
  return grid.flat().filter((cell) => cell.value === 0).length <= 0;
};

export default gridIsFilled;
