/**
 * Update the gauges on the DOM with the links contained in `view.gauges`.
 * @param {JSON} view The view object within a viewController object.
 */
const updateGauges = view => {
  if (!view.gauges) return;
  const gauges = view.gauges;
  for (let i = 0; i < gauges.length; i++) {
    let $gauge = document.getElementById(`gauge-${i + 1}`);
    $gauge.setAttribute('href', gauges[i]);
  }
  return;
};

/**
 * Update the animations on the DOM according to the animations in
 * `view.animations`.
 * @param {JSON} view The view object within a viewController object.
 */
const updateAnimations = view => {
  if (!view.animations) return;

  const flowables = Array.from(document.getElementsByClassName('flowable'));
  const electrons = Array.from(document.getElementsByClassName('electron'));

  if (view.animations.includes('pipes')) {
    flowables.forEach(elmt => elmt.classList.add('flow-active'));
  } else {
    flowables.forEach(elmt => elmt.classList.remove('flow-active'));
  }

  if (view.animations.includes('electricity')) {
    electrons.forEach(elmt => elmt.classList.add('electron-active'));
  } else {
    electrons.forEach(elmt => elmt.classList.remove('electron-active'));
  }
};

/**
 * Responsible for updating the necessary elements on the DOM to reflect
 * the view specified.
 * @param {JSON} view The view object to render.
 */
export const renderView = view => {
  console.log(`Rendering view: ${view.name}`);

  // Remove highlight from previous view and highlight current one
  Array.from(document.getElementsByClassName('currentView')).forEach(elm =>
    elm.classList.remove('currentView')
  );

  document.getElementById(`${view.name}Button`).classList.add('currentView');

  updateGauges(view);
  updateAnimations(view);
};

const clearDash = () => {
  const $wrap = document.getElementById('svg-wrap');
  Array.from($wrap.children)
    .filter(child => child.tagName != 'defs')
    .forEach(child => $wrap.removeChild(child));
};