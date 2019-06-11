export const editorDriver = evt => {
  const svg = evt.target;

  let element = null,
    dragX = 0,
    dragY = 0;

  const translateRe = new RegExp(`translate\\([^\(\)]*\\)`, `i`);

  const startDrag = evt => {
    if (evt.target.classList.contains('draggable')) {
      element = evt.target;
      element.parentNode.appendChild(element);
      element.style.opacity = '0.75';
    }
    evt.preventDefault();

    let transform = element.style.transform;
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
      }
    }
  };

  const drag = evt => {
    if (element) {
      evt.preventDefault();
      let x = evt.clientX - dragX;
      let y = evt.clientY - dragY;
      let transform = element.style.transform;
      transform = transform.replace(translateRe, `translate(${x}px, ${y}px)`);

      element.style.transform = transform;
    }
  };

  const endDrag = evt => {
    if (element) {
      element.style.opacity = '1.0';
    }
    element = null;
  };

  svg.addEventListener('mousedown', startDrag);
  svg.addEventListener('mousemove', drag);
  svg.addEventListener('mouseup', endDrag);
  svg.addEventListener('mouseleave', endDrag);
};
