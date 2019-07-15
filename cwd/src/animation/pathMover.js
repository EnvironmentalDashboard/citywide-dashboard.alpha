import { getCompositeTransform } from './commonFunctions';

export const pathMover = state => {
  let duration = 5000;

  let lastStepped = 0;
  let stepEvery = 1;

  let path = null;

  return {
    duration: function(dur) {
      duration = dur;

      return this;
    },

    path: function(shape) {
      path = shape;
      state.path = shape;

      return this;
    },

    step: function(timestamp) {
      lastStepped = timestamp;

      let current = timestamp % duration;

      let lengthOnPath =
        (current / duration) * state.path.$link.getTotalLength();

      let linkTransformable = state.$link.tagName.toUpperCase() === 'SVG' ? false : true;

      /**
       * @todo This may be leakly logic...
       */
      let point = state.path.$link.getPointAtLength(lengthOnPath);

      if (linkTransformable) {
        const transform = getCompositeTransform(
          state,
          `translate(${point.x}px, ${point.y}px)`
        );
        state.style = Object.assign(state.style, { transform });
      } else {
        state.style = Object.assign(state.style, { x: point.x, y: point.y });
      }

    },

    readyToStep: function(timestamp) {
      return timestamp - lastStepped >= stepEvery;
    }
  };
};
