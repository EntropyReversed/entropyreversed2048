const removeZeroesAndAddNumbers = (arr) => {
  const newArr = [...arr].filter((n) => n.value !== 0);
  for (let index = newArr.length - 1; index >= 0; index--) {
    const prevIndex = index - 1;
    newArr[index].ghost = -1;
    newArr[index].merged = false;
    if (prevIndex >= 0 && newArr[index].value === newArr[prevIndex].value) {
      newArr[index].value = newArr[index].value * 2;
      newArr[prevIndex].value = 0;
      newArr[index].ghost = +arr
        .map((c) => {
          if (c.index === newArr[prevIndex].index) {
            return c.index;
          }
        })
        .filter((n) => n !== undefined)
        .toString();
      newArr[index].merged = true;
    }
  }
  return [...newArr].filter((n) => n.value !== 0);
};

export default removeZeroesAndAddNumbers;
