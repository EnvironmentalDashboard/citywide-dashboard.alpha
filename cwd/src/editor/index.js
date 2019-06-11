export const makeDraggable = evt => {
  const svg = evt.target;

  let element = null,
    dragX = 0,
    dragY = 0;

  const translateRe = new RegExp(`translate\\([^\(\)]*\\)`, `i`);

  const startDrag = evt => {
    if (evt.target.classList.contains('draggable')) {
      element = evt.target;
    }
    evt.preventDefault();

    // console.log("you've got the element", element);

    let transform = element.style.transform;
    // console.log('at the start, transform is:', transform);
    let translate = translateRe.exec(transform);
    dragX = evt.clientX;
    dragY = evt.clientY;

    if (translate) {
      const digits = translate[0].match(/(-?[0-9\.]+)/g);
      dragX -= parseFloat(digits[0] || 0);
      dragY -= parseFloat(digits[1] || 0);
    } else {
      translate = 'translate(0px, 0px)';
      if (transform) {
        element.style.transform = translate + transform;
      } else {
        element.style.transform = 'translate(10px, 10px)';
        // console.log('in else, the transform is ', element.style.transform);
      }
    }
  };

  const drag = evt => {
    if (element) {
      evt.preventDefault();
      let x = evt.clientX - dragX;
      let y = evt.clientY - dragY;
      // console.log('x is', x, 'y is', y);
      // console.log('element is', element);
      let transform = element.style.transform;
      // console.log('current transform', transform);
      transform = transform.replace(translateRe, `translate(${x}px, ${y}px)`);
      // console.log('new transform', transform);
      element.style.transform = transform;
    }
  };

  const endDrag = evt => {
    element = null;
  };

  svg.addEventListener('mousedown', startDrag);
  svg.addEventListener('mousemove', drag);
  svg.addEventListener('mouseup', endDrag);
  svg.addEventListener('mouseleave', endDrag);
};
