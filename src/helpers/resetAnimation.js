const resetAnimation = () => {
  document.querySelectorAll('.cell').forEach((el) => {
    el.style.animation = 'none';
    el.offsetHeight; // reflow
    el.style.animation = null;

    const inner = el.querySelector('.cell__inner');
    inner.style.animation = 'none';
    inner.offsetHeight; // reflow
    inner.style.animation = null;
  });
};

export default resetAnimation;
