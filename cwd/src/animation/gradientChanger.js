export const gradientChanger = state => {
  let duration = 0;
  let lastStepped = 0;
  let stepEvery = 5000;

  return {
    duration: function(dur) {
      duration = dur;

      return this;
    },

    step: function(timestamp) {
      console.log(state, timestamp);
      // lastStepped = timestamp;
      // const current = timestamp % duration;
      // const turnsRotated =
      //   (current / duration) * directionDictionary[direction];
      // const transform = getCompositeTransform(
      //   state,
      //   `rotate(${turnsRotated}turn)`
      // );

      // state.style = Object.assign(state.style, { transform });
    },

    readyToStep: function(timestamp) {
      return timestamp - lastStepped >= stepEvery;
    }
  };
};
