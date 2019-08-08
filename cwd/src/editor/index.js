export const editorDriver = glyph => {
  const loadListener = evt => {
    const svg = evt.target;

    let element = null,
      dragX = 0,
      dragY = 0,
      parent = null;

    const translateRe = new RegExp(`translate\\([^\(\)]*\\)`, `i`);

    const startDrag = evt => {
      element = evt.currentTarget;
      parent = element.parentNode;
      parent.appendChild(element);
      element.style.opacity = '0.75';

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

    const startDragSVG = evt => {
      element = evt.currentTarget;
      parent = element.parentNode;
      parent.appendChild(element);
      element.style.opacity = '0.75';

      dragX = evt.clientX;
      dragY = evt.clientY;

      dragX -=
        (parseFloat(element.getAttribute('x')) / 100) * parent.clientWidth;
      dragY -=
        (parseFloat(element.getAttribute('y')) / 100) * parent.clientHeight;
    };

    const drag = evt => {
      if (!element) return;
      let x = evt.clientX - dragX;
      let y = evt.clientY - dragY;
      let transform = element.style.transform;
      transform = transform.replace(translateRe, `translate(${x}px, ${y}px)`);
      element.style.transform = transform;
    };

    const dragSVG = evt => {
      if (!element) return;
      let x = evt.clientX - dragX;
      let y = evt.clientY - dragY;
      x = (x / parent.clientWidth) * 100;
      y = (y / parent.clientHeight) * 100;
      element.setAttribute('x', `${x}%`);
      element.setAttribute('y', `${y}%`);
      glyph.state.style.x = `${x}%`;
      glyph.state.style.y = `${y}%`;
    };

    const endDrag = evt => {
      if (element) {
        element.style.opacity = '1.0';
      }
      element = null;
      parent = null;
    };

    if (svg.tagName.toUpperCase() === 'SVG')
      svg.addEventListener('mousedown', startDragSVG);
    else svg.addEventListener('mousedown', startDrag);
    if (svg.tagName.toUpperCase() === 'SVG')
      svg.addEventListener('mousemove', dragSVG);
    else svg.addEventListener('mousemove', drag);
    svg.addEventListener('mouseup', endDrag);
    svg.addEventListener('mouseleave', endDrag);
  };
  return loadListener;
};
