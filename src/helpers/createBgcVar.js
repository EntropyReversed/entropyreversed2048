const createBgcVar = (gridSize, cellSize, gap) => {
  const cellW = cellSize + gap;
  const cellsNo = gridSize * gridSize;
  let cssVar = '';
  for (let i = 0; i < cellsNo; i++) {
    cssVar += `${cellW * (i % gridSize)}px ${
      cellW * Math.floor(i / gridSize)
    }px 0px #ccc0b3 ${i === cellsNo - 1 ? '' : ','}`;
  }
  return cssVar;
};

export default createBgcVar;
