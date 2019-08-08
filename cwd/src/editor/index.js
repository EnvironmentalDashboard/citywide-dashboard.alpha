export const editorDriver = glyph => {
  const loadListener = evt => {
    const element = evt.target;
    const tagName = element.tagName.toUpperCase();

    let dragging = false,
      dragX = 0,
      dragY = 0,
      parent = null;

    const translateRe = new RegExp(`translate\\([^\(\)]*\\)`, `i`);

    const startDrag = evt => {
      dragging = true;
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
      dragging = true;
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

    // TODO: Update the glyph object to represent accurate numbers of
    // x +/- transform, y +/- transform for svgImage glyphs.
    const drag = evt => {
      if (!dragging) return;
      let x = evt.clientX - dragX;
      let y = evt.clientY - dragY;
      let transform = element.style.transform;
      transform = transform.replace(translateRe, `translate(${x}px, ${y}px)`);
      element.style.transform = transform;
      glyph.state.style.x = `${x}%`;
      glyph.state.style.y = `${y}%`;
      glyph.state.wasUpdated = true;
    };

    const dragSVG = evt => {
      if (!dragging) return;
      let x = evt.clientX - dragX;
      let y = evt.clientY - dragY;
      x = (x / parent.clientWidth) * 100;
      y = (y / parent.clientHeight) * 100;
      element.setAttribute('x', (glyph.state.style.x = `${x}%`));
      element.setAttribute('y', (glyph.state.style.y = `${y}%`));
    };

    const endDrag = evt => {
      if (dragging) {
        element.style.opacity = '1.0';
        glyph.state.wasUpdated = true;
      }
      dragging = false;
      parent = null;
    };

    if (tagName === 'SVG') {
      element.addEventListener('mousedown', startDragSVG);
      element.addEventListener('mousemove', dragSVG);
    } else {
      element.addEventListener('mousedown', startDrag);
      element.addEventListener('mousemove', drag);
    }
    element.addEventListener('mouseup', endDrag);
    element.addEventListener('mouseleave', endDrag);
  };
  return loadListener;
};
