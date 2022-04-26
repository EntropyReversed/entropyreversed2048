const deepCopy = (obj) => {
  if (typeof obj == 'object') {
    if (Array.isArray(obj)) {
      const r = new Array(obj.length);
      for (let i = 0; i < obj.length; i++) {
        r[i] = deepCopy(obj[i]);
      }
      return r;
    } else {
      const r = {};
      for (let k in obj) {
        r[k] = deepCopy(obj[k]);
      }
      return r;
    }
  }
  return obj;
};

export default deepCopy;
