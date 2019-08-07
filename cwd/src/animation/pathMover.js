import { getCompositeTransform } from './commonFunctions';

export const pathMover = state => {
  let duration = 5000;

  let lastStepped = 0;
  let stepEvery = 1;

  let path = null;
  let groupId = null;

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

    toSVGGroup: function(id) {
      if (id) {
        groupId = id;
      }
      return this;
    },

    step: function(timestamp) {
      lastStepped = timestamp;
      let current = timestamp % duration;

      if (!state.path.$link) {
        return;
      }
      
      let lengthOnPath =
      (current / duration) * state.path.$link.getTotalLength();
      /**
       * @todo This may be leakly logic...
       */
      let point = state.path.$link.getPointAtLength(lengthOnPath);
      
      if (groupId) {
        let $group = null;
        for (let node of state.$link.children) {
          if (node.id === groupId) {
            $group = node;
            const transform = getCompositeTransform(
              $group.style,
              `translate(${point.x}px, ${point.y}px)`
            );
            $group.style.transform = transform;
          }
        }
      } else {
        let linkTransformable =
          state.$link.tagName.toUpperCase() === 'SVG' ? false : true;

        // TODO: Transform by point.x vs. setting x: point.x? Behavior is inconsistent.
        if (linkTransformable) {
          const transform = getCompositeTransform(
            state.style,
            `translate(${point.x}px, ${point.y}px)`
          );
          state.style = Object.assign(state.style, { transform });
        } else {
          state.style = Object.assign(state.style, { x: point.x, y: point.y });
        }
      }
    },

    readyToStep: function(timestamp) {
      return timestamp - lastStepped >= stepEvery;
    }
  };
};
