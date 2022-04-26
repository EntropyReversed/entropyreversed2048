const transpose = (grid) => {
  return grid[0].map((_, i) => grid.map((row) => row[i]));
};

export default transpose;
