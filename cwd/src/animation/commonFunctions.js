/**
 * Creates a composite transform from other `state.style` transform properties.
 * @param {String} tf transform to be added to state.style.transform
 * @returns {String}
 */
const getCompositeTransform = (state, tf) => {
  const transformType = tf.substring(0, tf.indexOf('('));
  const typeSearch = new RegExp(`${transformType}\\([^\(\)]*\\)`, `i`);
  let transform;
  if (state.style.transform) {
    let idx = state.style.transform.search(typeSearch);
    if (idx < 0) {
      transform = `${state.style.transform} ${tf}`;
    } else {
      transform = state.style.transform.replace(typeSearch, tf);
    }
  } else {
    transform = tf;
  }

  return transform.toString();
};

export { getCompositeTransform };
