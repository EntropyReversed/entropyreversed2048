const restoreZeros = (arr, size, row) => {
  const newArr = [];
  for (let i = 0; i < size - arr.length; i++) {
    newArr.push({ index: row * size + i, value: 0 });
  }
  return newArr.concat(arr);
};
export default restoreZeros;
