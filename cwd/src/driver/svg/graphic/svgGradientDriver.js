export const svgGradientDriver = () => {
  return {
    create: function (state) {
      // todo put in defs block
      let $gradient = document.createElementNS(
        'http://www.w3.org/2000/svg',
        state.type
      );
      $gradient.setAttribute('id', state.id);
      for (let i = 0; i < state.stops.length; i++) {
        let attrs = state.stops[i];
        let stop = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
        for (var attr in attrs) {
          if (attrs.hasOwnProperty(attr)) {
            stop.setAttribute(attr, attrs[attr]);
          }
        }
        $gradient.appendChild(stop);
      }

      return $gradient;
    },

    update: function (state) {
      let children = state.$link.children;
      for (let i = 0; i < children.length; i++) {
        let stop = children[i];
        let plusOne = parseInt(stop.getAttribute('offset')) + 1;
        if (plusOne === 100) {
          for (let j = 0; j < children.length; j++) {
            children[j].setAttribute('offset', j * 30);
          }
          break;
        }
        stop.setAttribute('offset', plusOne + '%');
        
      }

      for (let key in state.style) {
        state.$link.style[key] = state.style[key];
      }
      // let that = this;
      // setTimeout(function() {that.update(state);}, 200); // todo hacky fix
    }
  };
};
