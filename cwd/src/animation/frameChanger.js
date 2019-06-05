export const frameChanger = state => {
  let current = 0;
  let increment = 1;

  let frames = [];
  let duration = 5000;

  let lastStepped = 0;
  let stepEvery = 1;

  function nextFrame() {
    current = current + increment;

    if (current + increment >= frames.length || current + increment < 0) {
      increment *= -1;
    }
  }

  return {
    duration: function(dur) {
      duration = dur;
      stepEvery = duration / (frames.length * 2);

      return this;
    },

    frames: function(arr) {
      frames = arr;
      stepEvery = duration / (frames.length * 2);

      return this;
    },

    step: function(timestamp) {
      nextFrame();
      lastStepped = timestamp;

      state.shape(frames[current]);
    },

    readyToStep: function(timestamp) {
      return timestamp - lastStepped >= stepEvery;
    }
  };
};
