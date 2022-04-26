const createGrid = (size) => {
  const rows = [];
  for (let i = 0; i < size; i++) {
    rows.push([]);
    for (let j = 0; j < size; j++) {
      rows[i][j] = {
        index: i * size + j,
        lastIndex: i * size + j,
        value: 0,
        ghost: -1,
        pop: false,
        merged: false,
      };
    }
  }
  return rows;
};

export default createGrid;
