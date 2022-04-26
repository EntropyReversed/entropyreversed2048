const gridUpdated = (oldGrid, newGrid) => {
  const oldFlat = oldGrid.flat();
  const newFlat = newGrid.flat();
  let gridChanged = false;
  
  for (let i = 0; i < oldFlat.length; i++) {
    if (oldFlat[i].value !== newFlat[i].value) {
      gridChanged = true;
      break;
    }
  }

  return gridChanged;
};

export default gridUpdated;
