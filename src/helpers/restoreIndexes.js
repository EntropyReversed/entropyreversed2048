const restoreIndexes = (arr, size) => {
  const newArr = [...arr];
  newArr.forEach((row, rowIndex) => {
    row.forEach((cell, cellIndex) => {
      cell.lastIndex = cell.index;
      cell.index = rowIndex * size + cellIndex;
      cell.pop = false;
      // cell.ghost = cell.ghost ? cell.ghost : -1
    });
  });
  return newArr;
};
export default restoreIndexes;
